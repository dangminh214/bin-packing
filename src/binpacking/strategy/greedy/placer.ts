import { GreedyPlacement } from "@/algorithm/greedy/placement-strategy";
import { Box } from "@/binpacking/classes/box";
import type { Rectangle } from "@/binpacking/classes/rectangle";
import type { Solution } from "@/algorithm/abstract-solution";
import type { AlgSolution } from "@/binpacking/algorithm-solution";

export type ToPlacePosition = {
    id: number;
    x: number;
    y: number;
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
    ): { id: number; x: number; y: number } | false {
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
        // 1. bottom-left corner
        if (box.checkPossible(item, { x: 0, y: 0 })) {
            return {
                id: box.id,
                x: 0,
                y: 0,
            };
        }

        // 2. bottom-left positions induced by placed rectangles
        for (const placed of box.getRectangles()) {
            // to the right
            if (
                box.checkPossible(item, {
                    x: placed.position.x! + placed.getWidth(),
                    y: placed.position.y!,
                })
            ) {
                return {
                    id: box.id,
                    x: placed.position.x! + placed.getWidth(),
                    y: placed.position.y!,
                };
            }

            // above
            if (
                box.checkPossible(item, {
                    x: placed.position.x!,
                    y: placed.position.y! + placed.getHeight(),
                })
            ) {
                return {
                    id: box.id,
                    x: placed.position.x!,
                    y: placed.position.y! + placed.getHeight(),
                };
            }
        }

        return false;
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
        const toPlaceBox = algSol.items[toPlacePos.id];
        // Set the rectangle's position
        rect.setPosition(toPlacePos.x, toPlacePos.y);
        toPlaceBox.addRectangle(rect);
    }

    // private placeInBox(rect: Rectangle, box: Box);
}
