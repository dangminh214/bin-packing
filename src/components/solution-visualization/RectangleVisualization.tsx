import type { Rectangle } from "@/binpacking/classes/rectangle";

interface RectangleProps {
    rect: Rectangle;
    scale: number;
}

export const RectangleVisualization: React.FC<RectangleProps> = ({
    rect,
    scale,
}) => {
    const x = rect.position.x! * scale;
    const y = rect.position.y! * scale;
    const width = rect.getWidth() * scale;
    const height = rect.getHeight() * scale;
    // Use blue for normal rectangles, light red for rotated ones
    const color = rect.getIsRotated() ? "#fca5a5" : "#3b82f6";

    return (
        <div
            key={rect.id}
            className="absolute border border-gray-700 flex items-center justify-center text-black text-xs font-bold transition-all hover:opacity-80 cursor-pointer box-border"
            style={{
                left: x,
                bottom: y,
                width,
                height,
                backgroundColor: color,
            }}
            title={`ID: ${rect.id}, Size: ${rect.getWidth()}x${rect.getHeight()}, Pos: (${rect.position.x}, ${rect.position.y})${rect.getIsRotated() ? " (Rotated)" : ""}`}
        >
            {rect.id}
        </div>
    );
};
