import { Label } from "../ui/label";

export type AlgorithmType = "greedy" | "localSearch";
export type SelectionStrategy = "area" | "height";
export type PlacementStrategy = "bottomLeft";

interface AlgorithmSelectorProps {
    algorithm: AlgorithmType;
    selectionStrategy: SelectionStrategy;
    placementStrategy: PlacementStrategy;
    onAlgorithmChange: (algorithm: AlgorithmType) => void;
    onSelectionStrategyChange: (strategy: SelectionStrategy) => void;
    onPlacementStrategyChange: (strategy: PlacementStrategy) => void;
}

const algorithmOptions = [
    { value: "greedy", label: "Greedy Algorithm" },
    { value: "localSearch", label: "Local Search" },
];

const selectionStrategyOptions = {
    greedy: [
        { value: "area", label: "Area Descending" },
        { value: "height", label: "Height Descending" },
    ],
    localSearch: [{ value: "area", label: "Area Based" }],
};

const placementStrategyOptions = {
    greedy: [{ value: "bottomLeft", label: "Bottom-Left Placement" }],
    localSearch: [{ value: "bottomLeft", label: "Bottom-Left Placement" }],
};

export function AlgorithmSelector({
    algorithm,
    selectionStrategy,
    placementStrategy,
    onAlgorithmChange,
    onSelectionStrategyChange,
    onPlacementStrategyChange,
}: AlgorithmSelectorProps) {
    const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newAlgorithm = e.target.value as AlgorithmType;
        onAlgorithmChange(newAlgorithm);

        // Reset strategies to first available option when algorithm changes
        const firstSelection = selectionStrategyOptions[newAlgorithm][0]
            .value as SelectionStrategy;
        const firstPlacement = placementStrategyOptions[newAlgorithm][0]
            .value as PlacementStrategy;
        onSelectionStrategyChange(firstSelection);
        onPlacementStrategyChange(firstPlacement);
    };

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="algorithm">Algorithm</Label>
                <select
                    id="algorithm"
                    value={algorithm}
                    onChange={handleAlgorithmChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {algorithmOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Label htmlFor="selectionStrategy">Selection Strategy</Label>
                <select
                    id="selectionStrategy"
                    value={selectionStrategy}
                    onChange={(e) =>
                        onSelectionStrategyChange(
                            e.target.value as SelectionStrategy,
                        )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {selectionStrategyOptions[algorithm].map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Label htmlFor="placementStrategy">Placement Strategy</Label>
                <select
                    id="placementStrategy"
                    value={placementStrategy}
                    onChange={(e) =>
                        onPlacementStrategyChange(
                            e.target.value as PlacementStrategy,
                        )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {placementStrategyOptions[algorithm].map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
