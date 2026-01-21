import { GreedyPlacement } from "@/algorithm/greedy/placement-strategy";
import { Box } from "@/binpacking/classes/box";
import type { Rectangle } from "@/binpacking/classes/rectangle";
import type { Solution } from "@/algorithm/abstract-solution";
import type { AlgSolution } from "@/binpacking/algorithm-solution";

export type ToPlacePosition = {
    cid: number;
    x: number;
    y: number;
    shouldRotate?: boolean;
};

export class BottomLeftPlacer extends GreedyPlacement<
    Rectangle,
    Box,
    AlgSolution
> {
    private boxL: number;

    constructor(boxL: number = 30) {
        super();
        this.boxL = boxL;
    }

    protected canPlace(
        item: Rectangle,
        solution: Solution<Box>,
    ): { cid: number; x: number; y: number } | false {
        const boxes = solution.items;

        // Try to place in existing boxes
        for (const box of boxes) {
            const pos = this.canPlaceInABox(item, box);
            if (pos) {
                return pos;
            }
        }

        // If no existing box can fit the item, create a new box
        const newBoxId = boxes.length;
        const newBox = new Box(newBoxId, this.boxL);
        solution.items.push(newBox);

        // Try to place in the new box
        return this.canPlaceInABox(item, newBox);
    }

    private canPlaceInABox(item: Rectangle, box: Box): ToPlacePosition | false {
        // Try both orientations: normal first, then rotated
        // 1. Try normal orientation
        const normalResult = this.tryPlaceInBox(item, box, false);
        if (normalResult) {
            return normalResult;
        }

        // 2. Try rotated orientation (only if rectangle is not square)
        if (item.getWidth() !== item.getHeight()) {
            const rotatedResult = this.tryPlaceInBox(item, box, true);
            if (rotatedResult) {
                return rotatedResult;
            }
        }

        return false;
    }

    private tryPlaceInBox(
        item: Rectangle,
        box: Box,
        shouldRotate: boolean,
    ): ToPlacePosition | false {
        // Temporarily rotate if needed for testing
        if (shouldRotate) {
            item.rotate();
        }

        let result: ToPlacePosition | false = false;

        // 1. bottom-left corner
        if (box.checkPossible(item, { x: 0, y: 0 })) {
            result = {
                cid: box.id,
                x: 0,
                y: 0,
                shouldRotate,
            };
        }

        // 2. bottom-left positions induced by placed rectangles
        if (!result) {
            for (const placed of box.getRectangles()) {
                // to the right
                if (
                    box.checkPossible(item, {
                        x: placed.position.x! + placed.getWidth(),
                        y: placed.position.y!,
                    })
                ) {
                    result = {
                        cid: box.id,
                        x: placed.position.x! + placed.getWidth(),
                        y: placed.position.y!,
                        shouldRotate,
                    };
                    break;
                }

                // above
                if (
                    box.checkPossible(item, {
                        x: placed.position.x!,
                        y: placed.position.y! + placed.getHeight(),
                    })
                ) {
                    result = {
                        cid: box.id,
                        x: placed.position.x!,
                        y: placed.position.y! + placed.getHeight(),
                        shouldRotate,
                    };
                    break;
                }
            }
        }

        // Always rotate back to original state after testing
        if (shouldRotate) {
            item.rotate();
        }

        return result;
    }

    /**
     * Place a rectangle in a solution
     * This function is called after checked that the position is valid
     * @param rect
     * @param algSol
     */
    protected place(
        rect: Rectangle,
        algSol: AlgSolution,
        toPlacePos: ToPlacePosition,
    ) {
        const toPlaceBox = algSol.items[toPlacePos.cid];

        // Rotate the rectangle if needed
        if (toPlacePos.shouldRotate) {
            rect.rotate();
        }

        // Set the rectangle's position
        rect.setPosition(toPlacePos.x, toPlacePos.y);
        toPlaceBox.addRectangle(rect);
    }
}
