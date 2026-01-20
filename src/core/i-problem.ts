// abstract definition of the optimization problem

import type { IItem } from "./i-item";
import { Solution } from "../algorithm/abstract-solution";

/**
 * Generic interface for an Optimization Problem.
 * S represents the Solution type (e.g., PackingSolution).
 */
export interface IProblem<I extends IItem, S extends Solution<I>> {
    /**
     * Generates a "decidedly bad" starting solution for the Local Search.
     * This is required so the algorithm can demonstrate convincing improvements.
     */
    createInitialSolution(): S;

    /**
     * Provides the raw data needed for the Greedy algorithm.
     * In your case, this would return the list of rectangles sorted
     * based on their area.
     */
    getUnplacedItems(): I[];
}
