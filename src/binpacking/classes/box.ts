import type { Position } from "../types/position";
import type { Rectangle } from "./rectangle";

export class Box {
    readonly id;
    readonly boxL;
    readonly area;

    private rectangles: Rectangle[];

    constructor(id: number, boxL: number) {
        this.id = id;
        this.boxL = boxL;
        this.rectangles = [];
        this.area = boxL * boxL;
    }

    addRectangle(rectangle: Rectangle) {
        this.rectangles.push(rectangle);
    }

    getRectangles() {
        return this.rectangles;
    }

    // checkOverlapping(rect1: Rectangle, rect2: Rectangle): boolean {
    //     const { x: x1, y: y1 } = rect1.position;
    //     const { x: x2, y: y2 } = rect2.position;

    //     return !(
    //         x1! + rect1.getWidth() <= x2! ||
    //         x2! + rect2.getWidth() <= x1! ||
    //         y1! + rect1.getHeight() <= y2! ||
    //         y2! + rect2.getHeight() <= y1!
    //     );
    // }

    // checkOverflowed(rectangle: Rectangle): boolean {
    //     const { x, y } = rectangle.position;
    //     return (
    //         x! + rectangle.getWidth() > this.boxL ||
    //         y! + rectangle.getHeight() > this.boxL
    //     );
    // }

    checkPossible(rectangle: Rectangle, pos: Position): boolean {
        const x = pos.x!;
        const y = pos.y!;

        // 1. Boundary check (fast reject)
        if (x < 0 || y < 0) return false;
        if (x + rectangle.getWidth() > this.boxL) return false;
        if (y + rectangle.getHeight() > this.boxL) return false;

        // 2. Overlap check
        for (const r of this.rectangles) {
            if (
                x < r.position.x! + r.getWidth() &&
                x + rectangle.getWidth() > r.position.x! &&
                y < r.position.y! + r.getHeight() &&
                y + rectangle.getHeight() > r.position.y!
            ) {
                return false;
            }
        }

        return true;
    }
}
