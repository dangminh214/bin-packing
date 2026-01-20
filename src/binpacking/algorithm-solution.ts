import { Solution } from "@/algorithm/abstract-solution";
import type { Box } from "./classes/box";
// import type { Rectangle } from "./classes/rectangle";

export class AlgSolution extends Solution<Box> {
    items: Box[];

    constructor() {
        super();
        this.items = [];
    }
}
