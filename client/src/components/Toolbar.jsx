import React from 'react';

const Toolbar = ({ color, setColor, strokeWidth, setStrokeWidth, onClear, tool, setTool }) => {
  const colors = [
    { name: "black", hex: "#1e293b", label: "Black" },
    { name: "red", hex: "#ef4444", label: "Red" },
    { name: "blue", hex: "#3b82f6", label: "Blue" },
    { name: "green", hex: "#10b981", label: "Green" },
    { name: "purple", hex: "#8b5cf6", label: "Purple" },
    { name: "orange", hex: "#f59e0b", label: "Orange" },
  ];

  return (
    <div className="flex items-center gap-4 bg-white border-b border-slate-200 px-4 py-2.5 w-full justify-center flex-wrap">
      {/* Tool Buttons */}
      <div className="flex items-center gap-1 border border-slate-200 rounded-md p-0.5">
        <button
          onClick={() => setTool('pencil')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            tool === 'pencil'
              ? 'bg-blue-600 text-white'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          Pencil
        </button>
        <button
          onClick={() => setTool('eraser')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            tool === 'eraser'
              ? 'bg-blue-600 text-white'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          Eraser
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-200"></div>

      {/* Color Picker */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-600 font-medium">Color:</span>
        <div className="flex gap-1.5">
          {colors.map((c) => (
            <button
              key={c.name}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                color === c.name
                  ? "border-slate-900 scale-110"
                  : "border-slate-300 hover:border-slate-400"
              }`}
              style={{ backgroundColor: c.hex }}
              onClick={() => setColor(c.name)}
              title={c.label}
            ></button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-200"></div>

      {/* Stroke Width Slider */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-600 font-medium">Size:</span>
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
          className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((strokeWidth - 1) / 19) * 100}%, #e2e8f0 ${((strokeWidth - 1) / 19) * 100}%, #e2e8f0 100%)`
          }}
        />
        <span className="text-xs text-slate-600 font-mono w-8">{strokeWidth}px</span>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-200"></div>

      {/* Clear Button */}
      <button
        className="px-3 py-1.5 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  );
};

export default Toolbar;
