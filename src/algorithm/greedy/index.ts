// Generic Logic (No React, No CSS)
// Pure TS: implements the Greedy logic
import { Solution } from "@/algorithm/abstract-solution";
import type { IItem } from "@/core/i-item";
import type { GreedyPlacement } from "./placement-strategy";
import type { GreedySelection } from "./selection-strategy";

/**
 * Generic algorithm implementation
 * For bin packing use case:
 * I should be Rectangle (Item)
 * C should be Box (Container)
 * S should be AlgSolution (Solution)
 */
export class Greedy<I extends IItem, C, S extends Solution<C>> {
    // the init solution will be extended while the algorithm runnning
    selectionStrategy: GreedySelection<I>; // e.g, first fit descending
    placementStrategy: GreedyPlacement<I, C, S>; //e.g. bottom left placement
    solution: S;

    constructor(
        initSolution: S,
        selectionStrategy: GreedySelection<I>,
        placementStrategy: GreedyPlacement<I, C, S>,
    ) {
        this.solution = initSolution;
        this.selectionStrategy = selectionStrategy;
        this.placementStrategy = placementStrategy;
    }

    /**
     * Base on the init solution of an algorithm, solve() extends that solution
     * It appends more item/container
     * @returns an extended solution
     */
    solve(): S {
        const start = performance.now();

        // 2. Order items based on the selection strategy (e.g., Area, Longest Side)
        const items = this.selectionStrategy.items;
        const orderedItems = this.selectionStrategy.orderItems(items);

        // 3. Start with an empty solution state
        // because the items are already ordered, if they are fine, add them imidiatly
        for (let i = 0; i < orderedItems.length; i++) {
            this.placementStrategy.checkThenAdd(orderedItems[i], this.solution);
        }

        // set runtime for the solution
        const runtime = performance.now() - start;
        this.solution.setRunTime(runtime);

        return this.solution;
    }
}
