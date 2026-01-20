import type { Rectangle, Position } from "./rectangle";

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
