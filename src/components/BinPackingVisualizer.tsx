import { useState, useEffect } from "react";
import { Greedy } from "@/algorithm/greedy";
import { Rectangle } from "@/binpacking/classes/rectangle";
import { AreaGreedyStrategy } from "@/binpacking/strategy/greedy/selection";
import { BottomLeftPlacer } from "@/binpacking/strategy/greedy/placer";
import { AlgSolution } from "@/binpacking/algorithm-solution";
import { BoxVisualization } from "./BoxVisualization";
import { Button } from "./ui/button";
import { ConfigInput } from "./ConfigInput";

export function BinPackingVisualizer() {
  const [solution, setSolution] = useState<AlgSolution | null>(null);
  const [config, setConfig] = useState({
    instanceNumber: 10,
    minW: 1,
    maxW: 20,
    minH: 1,
    maxH: 20,
    boxL: 30,
  });

  const generateAndSolve = () => {
    const rectangles: Rectangle[] = [];
    for (let i = 0; i < config.instanceNumber; i++) {
      const w = Math.floor(Math.random() * (config.maxW - config.minW + 1)) + config.minW;
      const h = Math.floor(Math.random() * (config.maxH - config.minH + 1)) + config.minH;
      rectangles.push(new Rectangle(i, w, h));
    }

    const selection = new AreaGreedyStrategy(rectangles);
    const placer = new BottomLeftPlacer(config.boxL);
    const algSol = new AlgSolution();
    const alg = new Greedy(algSol, selection, placer);
    const sol = alg.solve();

    setSolution(sol);
  };

  useEffect(() => {
    generateAndSolve();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Bin Packing Visualizer
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <ConfigInput
              id="instanceNumber"
              label="Number of Items"
              value={config.instanceNumber}
              onChange={(value) => setConfig({ ...config, instanceNumber: value })}
              min={1}
            />
            <ConfigInput
              id="minW"
              label="Min Width"
              value={config.minW}
              onChange={(value) => setConfig({ ...config, minW: value })}
              min={1}
            />
            <ConfigInput
              id="maxW"
              label="Max Width"
              value={config.maxW}
              onChange={(value) => setConfig({ ...config, maxW: value })}
              min={1}
            />
            <ConfigInput
              id="minH"
              label="Min Height"
              value={config.minH}
              onChange={(value) => setConfig({ ...config, minH: value })}
              min={1}
            />
            <ConfigInput
              id="maxH"
              label="Max Height"
              value={config.maxH}
              onChange={(value) => setConfig({ ...config, maxH: value })}
              min={1}
            />
            <ConfigInput
              id="boxL"
              label="Box Size"
              value={config.boxL}
              onChange={(value) => setConfig({ ...config, boxL: value })}
              min={1}
            />
          </div>
          <Button onClick={generateAndSolve}>Generate & Solve</Button>
        </div>

        {solution && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">Solution</h2>
            <p className="text-gray-700">
              <span className="font-medium">Boxes used:</span> {solution.items.length}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Runtime:</span> {solution.getFormattedRunTime()}
            </p>
          </div>
        )}

        {solution && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.items.map((box) => (
              <BoxVisualization key={box.id} box={box} scale={10} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
