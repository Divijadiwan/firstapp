'use client';

import { useRef, useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';

export default function Home() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [penSize, setPenSize] = useState(2);
  const [eraserSize, setEraserSize] = useState(10);
  const [penColor, setPenColor] = useState('#000000');
  const [brushType, setBrushType] = useState('round');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    
    if (isErasing) {
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = eraserSize;
    } else {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = penColor;
      context.lineWidth = penSize;
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext('2d');
    
    if (brushType === 'round') {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    } else if (brushType === 'splash') {
      for (let i = 0; i < 20; i++) {
        const radius = Math.random() * penSize;
        const angle = Math.random() * 2 * Math.PI;
        const x = offsetX + radius * Math.cos(angle);
        const y = offsetY + radius * Math.sin(angle);
        context.beginPath();
        context.arc(x, y, 1, 0, 2 * Math.PI);
        context.fillStyle = isErasing ? '#FFFFFF' : penColor;
        context.fill();
      }
    } else if (brushType === 'watercolor') {
      context.globalAlpha = 0.1;
      for (let i = 0; i < 3; i++) {
        context.beginPath();
        context.arc(offsetX, offsetY, penSize * (1 + Math.random()), 0, 2 * Math.PI);
        context.fillStyle = isErasing ? '#FFFFFF' : penColor;
        context.fill();
      }
      context.globalAlpha = 1;
    }
  };

  const stopDrawing = () => {
    canvasRef.current.getContext('2d').closePath();
    setIsDrawing(false);
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-black">Simple Drawing App</h1>
      <div className="flex items-start">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border border-gray-300 bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
        <Toolbar
          isErasing={isErasing}
          toggleEraser={toggleEraser}
          penSize={penSize}
          setPenSize={setPenSize}
          eraserSize={eraserSize}
          setEraserSize={setEraserSize}
          penColor={penColor}
          setPenColor={setPenColor}
          brushType={brushType}
          setBrushType={setBrushType}
        />
      </div>
    </div>
  );
}
