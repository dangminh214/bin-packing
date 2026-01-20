import { Box } from "@/binpacking/classes/box";

interface BoxVisualizationProps {
  box: Box;
  scale?: number;
}

const COLORS = [
  "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16",
  "#06b6d4", "#f43f5e", "#22c55e", "#eab308", "#a855f7",
];

export function BoxVisualization({ box, scale = 10 }: BoxVisualizationProps) {
  const rectangles = box.getRectangles();
  const boxSize = box.boxL * scale;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3">
        Box {box.id} ({rectangles.length} items)
      </h3>
      <div className="relative border-2 border-gray-800" style={{ width: boxSize, height: boxSize }}>
        {rectangles.map((rect) => {
          const x = rect.position.x! * scale;
          const y = rect.position.y! * scale;
          const width = rect.getWidth() * scale;
          const height = rect.getHeight() * scale;
          const color = COLORS[rect.id % COLORS.length];

          return (
            <div
              key={rect.id}
              className="absolute border border-gray-700 flex items-center justify-center text-white text-xs font-bold transition-all hover:opacity-80 cursor-pointer"
              style={{
                left: x,
                top: y,
                width,
                height,
                backgroundColor: color,
              }}
              title={`ID: ${rect.id}, Size: ${rect.getWidth()}x${rect.getHeight()}, Pos: (${rect.position.x}, ${rect.position.y})`}
            >
              {rect.id}
            </div>
          );
        })}
      </div>
    </div>
  );
}
