import type { IItem } from "@/core/i-item";

export type Position = { x: number | null; y: number | null };

export class Rectangle implements IItem {
    readonly id: number;
    private width: number;
    private height: number;
    private isRotated: boolean;
    readonly area: number;

    // Position within the box
    private x: number | null = null;
    private y: number | null = null;

    constructor(id: number, width: number, height: number) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.isRotated = false;
        this.area = this.height * this.width;
    }

    getIsRotated(): boolean {
        return this.isRotated;
    }

    get position(): Position {
        return { x: this.x, y: this.y };
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getWidth(): number {
        return this.width;
    }

    set setWidth(w: number) {
        this.width = w;
    }

    getHeight(): number {
        return this.height;
    }

    rotate() {
        [this.width, this.height] = [this.height, this.width];
        this.isRotated = !this.isRotated;
    }
}
