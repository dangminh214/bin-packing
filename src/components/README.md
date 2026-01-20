# Bin Packing Visualizer Components

## Components

### BinPackingVisualizer
Main component that orchestrates the bin packing visualization.
- Manages configuration state
- Generates random rectangles
- Runs the greedy algorithm
- Displays the solution

### BoxVisualization
Renders a single box with its packed rectangles.
- Visual representation using SVG-like positioning
- Color-coded rectangles
- Hover tooltips showing rectangle details

### ConfigInput
Reusable input component for configuration values.
- Label and input field
- Number validation
- Min/max constraints

## Usage

The app is already configured in `App.tsx`. Just run:
```bash
npm run dev
```

Then open http://localhost:5173/ in your browser.

## Features

- Adjustable parameters (number of items, dimensions, box size)
- Real-time visualization
- Color-coded rectangles for easy identification
- Hover to see rectangle details
- Performance metrics (runtime, number of boxes used)
