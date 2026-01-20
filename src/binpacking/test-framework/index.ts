import { Greedy } from "@/algorithm/greedy";
import { Rectangle } from "../classes/rectangle";
import { AreaGreedyStrategy } from "../strategy/greedy/selection";
import { BottomLeftPlacer } from "../strategy/greedy/placer";
// import { GreedyPlacement } from "@/algorithm/greedy/placement-strategy";
import { AlgSolution } from "../algorithm-solution";

export class TestFramework {
    private numberInstances: number;
    private minW: number;
    private maxW: number;
    private minH: number;
    private maxH: number;
    private rectangles: Rectangle[];
    private boxL: number;
    constructor(
        numberInstances: number,
        minW: number,
        maxW: number,
        minH: number,
        maxH: number,
        boxL: number,
    ) {
        this.numberInstances = numberInstances;
        this.minW = minW;
        this.maxW = maxW;
        this.minH = minH;
        this.maxH = maxH;
        this.rectangles = [];
        this.boxL = boxL;
    }

    generateInstances() {
        for (let i = 0; i < this.numberInstances; i++) {
            const w =
                Math.floor(Math.random() * (this.maxW - this.minW + 1)) +
                this.minW;

            const h =
                Math.floor(Math.random() * (this.maxH - this.minH + 1)) +
                this.minH;

            const rect = new Rectangle(i, w, h);

            this.rectangles.push(rect);
        }

        console.log(`Generated ${this.numberInstances} in test-framework`);
    }

    runGreedy() {
        const selection = new AreaGreedyStrategy(this.rectangles);
        const placer = new BottomLeftPlacer(this.boxL);
        const algSol = new AlgSolution();

        const alg = new Greedy(algSol, selection, placer);

        const sol = alg.solve();

        console.log("Solution boxes:", sol.items.length);
        console.log("Runtime:", sol.getFormattedRunTime());
        console.log("\nBoxes with rectangles:");
        sol.items.forEach((box, idx) => {
            console.log(
                `\nBox ${idx}: ${box.getRectangles().length} rectangles`,
            );
            box.getRectangles().forEach((rect) => {
                console.log(
                    `  Rectangle ${rect.id}: ${rect.getWidth()}x${rect.getHeight()} at (${rect.position.x}, ${rect.position.y})`,
                );
            });
        });
    }
}
