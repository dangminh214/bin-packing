import type { IPlacementStrategy } from "@/core/i-placement";
import type { Solution } from "../abstract-solution";
import type { IItem } from "@/core/i-item";

// If return true then add else skip
/**
 * check if it is possible to add an item into a solution
 * e.g. Bottom Left
 */
export abstract class GreedyPlacement<
    I extends IItem,
    C,
    S extends Solution<C>,
> implements IPlacementStrategy<I, S> {
    checkThenAdd(item: I, solution: S): boolean {
        const toPlacePos = this.canPlace(item, solution);
        if (toPlacePos) {
            this.place(item, solution, toPlacePos);
            return true;
        }
        return false;
    }

    /**
     * check if a rectangle can be placed in a solution
     * called in @function checkThenAdd
     */
    protected abstract canPlace(
        item: I,
        solution: S,
    ): { id: number; x: number; y: number } | false;

    /** Mutate solution by inserting the item */
    protected abstract place(
        item: I,
        solution: S,
        pos: { id: number; x: number; y: number },
    ): void;
}
