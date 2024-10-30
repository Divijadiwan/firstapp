import React from 'react';

const Toolbar = ({ 
  isErasing, 
  toggleEraser, 
  penSize, 
  setPenSize, 
  eraserSize, 
  setEraserSize, 
  penColor, 
  setPenColor,
  brushType,
  setBrushType
}) => {
  return (
    <div className="ml-4 flex flex-col space-y-4">
      <button
        onClick={toggleEraser}
        className={`px-4 py-2 rounded ${
          isErasing
            ? 'bg-red-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        {isErasing ? 'Eraser (On)' : 'Eraser (Off)'}
      </button>
      <div className="flex flex-col">
        <label htmlFor="penSize" className="text-sm font-medium text-gray-700">
          Pen Size: {penSize}
        </label>
        <input
          type="range"
          id="penSize"
          min="1"
          max="20"
          value={penSize}
          onChange={(e) => setPenSize(Number(e.target.value))}
          className="w-full"
        />
      </div>
      {isErasing && (
        <div className="flex flex-col">
          <label htmlFor="eraserSize" className="text-sm font-medium text-gray-700">
            Eraser Size: {eraserSize}
          </label>
          <input
            type="range"
            id="eraserSize"
            min="5"
            max="50"
            value={eraserSize}
            onChange={(e) => setEraserSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}
      <div className="flex flex-col">
        <label htmlFor="penColor" className="text-sm font-medium text-gray-700">
          Pen Color
        </label>
        <input
          type="color"
          id="penColor"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
          className="w-full h-10 cursor-pointer"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Brush Type</label>
        <select
          value={brushType}
          onChange={(e) => setBrushType(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="round">Round</option>
          <option value="splash">Splash</option>
          <option value="watercolor">Watercolor</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
