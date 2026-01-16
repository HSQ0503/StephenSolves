"use client";

import { useEffect, useRef } from "react";

type GraphType = "algebra" | "calculus" | "series" | "linear" | "graduate";

interface SineCosineGraphProps {
  activeGraph?: number;
}

const SineCosineGraph = ({ activeGraph = 0 }: SineCosineGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);
  const targetPhaseRef = useRef<number>(0);

  useEffect(() => {
    // Update target phase when activeGraph changes
    targetPhaseRef.current = activeGraph * Math.PI * 0.5;
  }, [activeGraph]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth * 2; // Higher resolution
        canvas.height = container.clientHeight * 2;
        ctx.scale(2, 2); // Scale for retina
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const graphConfigs = [
      {
        title: "Trigonometric Functions",
        subtitle: "y = sin(x) and y = cos(x)",
        color1: "#ffffff",
        color2: "#ffd700",
        func1: (x: number, phase: number) => Math.sin(x + phase),
        func2: (x: number, phase: number) => Math.cos(x + phase),
        label1: "sin(x)",
        label2: "cos(x)"
      },
      {
        title: "Derivatives",
        subtitle: "f(x) = x² and f'(x) = 2x",
        color1: "#ffffff",
        color2: "#90EE90",
        func1: (x: number, phase: number) => Math.pow(x / 2, 2) / 3,
        func2: (x: number, phase: number) => (x / 2) / 1.5,
        label1: "f(x) = x²",
        label2: "f'(x) = 2x"
      },
      {
        title: "Taylor Series",
        subtitle: "sin(x) approximation",
        color1: "#ffffff",
        color2: "#ff6b6b",
        func1: (x: number, phase: number) => Math.sin(x),
        func2: (x: number, phase: number) => x - Math.pow(x, 3) / 6 + Math.pow(x, 5) / 120,
        label1: "sin(x)",
        label2: "Taylor approx"
      },
      {
        title: "Parametric Curves",
        subtitle: "Lissajous Figure",
        color1: "#ffffff",
        color2: "#da70d6",
        func1: (x: number, phase: number) => Math.sin(x * 2 + phase),
        func2: (x: number, phase: number) => Math.sin(x * 3),
        label1: "x = sin(2t)",
        label2: "y = sin(3t)"
      },
      {
        title: "Fourier Analysis",
        subtitle: "Wave Superposition",
        color1: "#ffffff",
        color2: "#00bfff",
        func1: (x: number, phase: number) => Math.sin(x) + Math.sin(2 * x) / 2 + Math.sin(3 * x) / 3,
        func2: (x: number, phase: number) => Math.sin(x),
        label1: "Σ sin(nx)/n",
        label2: "sin(x)"
      }
    ];

    const draw = () => {
      if (!ctx || !canvas) return;

      const width = canvas.width / 2;
      const height = canvas.height / 2;
      const centerY = height / 2;
      const centerX = width / 2;
      const amplitude = height * 0.25;

      // Smooth transition to target phase
      const phaseDiff = targetPhaseRef.current - phaseRef.current;
      phaseRef.current += phaseDiff * 0.08;

      const config = graphConfigs[activeGraph % graphConfigs.length];

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#4a8db7");
      gradient.addColorStop(1, "#3d7a9e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle pattern overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      for (let i = 0; i < width; i += 20) {
        for (let j = 0; j < height; j += 20) {
          if ((i + j) % 40 === 0) {
            ctx.fillRect(i, j, 10, 10);
          }
        }
      }

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      // Minor grid
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Major grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 0; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw axes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 2;

      // X-axis
      ctx.beginPath();
      ctx.moveTo(30, centerY);
      ctx.lineTo(width - 20, centerY);
      ctx.stroke();

      // X-axis arrow
      ctx.beginPath();
      ctx.moveTo(width - 20, centerY);
      ctx.lineTo(width - 30, centerY - 5);
      ctx.moveTo(width - 20, centerY);
      ctx.lineTo(width - 30, centerY + 5);
      ctx.stroke();

      // Y-axis
      ctx.beginPath();
      ctx.moveTo(centerX, 20);
      ctx.lineTo(centerX, height - 30);
      ctx.stroke();

      // Y-axis arrow
      ctx.beginPath();
      ctx.moveTo(centerX, 20);
      ctx.lineTo(centerX - 5, 30);
      ctx.moveTo(centerX, 20);
      ctx.lineTo(centerX + 5, 30);
      ctx.stroke();

      // Draw tick marks
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "11px Figtree, sans-serif";
      ctx.textAlign = "center";

      // X-axis ticks
      for (let i = -3; i <= 3; i++) {
        if (i === 0) continue;
        const x = centerX + i * 50;
        ctx.beginPath();
        ctx.moveTo(x, centerY - 4);
        ctx.lineTo(x, centerY + 4);
        ctx.stroke();
        ctx.fillText(i === 1 ? "π" : i === -1 ? "-π" : `${i}π`, x, centerY + 18);
      }

      // Y-axis ticks
      for (let i = -2; i <= 2; i++) {
        if (i === 0) continue;
        const y = centerY - i * 40;
        ctx.beginPath();
        ctx.moveTo(centerX - 4, y);
        ctx.lineTo(centerX + 4, y);
        ctx.stroke();
        ctx.textAlign = "right";
        ctx.fillText(i.toString(), centerX - 10, y + 4);
      }

      // Axis labels
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "bold 12px Figtree, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("x", width - 15, centerY - 10);
      ctx.fillText("y", centerX + 15, 25);

      // Draw origin
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw function 2 (behind)
      ctx.strokeStyle = config.color2;
      ctx.lineWidth = 3;
      ctx.shadowColor = config.color2;
      ctx.shadowBlur = 8;
      ctx.beginPath();

      for (let px = 40; px < width - 30; px++) {
        const x = (px - centerX) / 50 * Math.PI;
        const y = centerY - config.func2(x, phaseRef.current) * amplitude;
        if (px === 40) {
          ctx.moveTo(px, y);
        } else {
          ctx.lineTo(px, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw function 1 (in front)
      ctx.strokeStyle = config.color1;
      ctx.lineWidth = 3;
      ctx.shadowColor = config.color1;
      ctx.shadowBlur = 10;
      ctx.beginPath();

      for (let px = 40; px < width - 30; px++) {
        const x = (px - centerX) / 50 * Math.PI;
        const y = centerY - config.func1(x, phaseRef.current) * amplitude;
        if (px === 40) {
          ctx.moveTo(px, y);
        } else {
          ctx.lineTo(px, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw title box
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.roundRect(15, 15, 180, 65, 10);
      ctx.fill();

      // Draw title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px Figtree, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(config.title, 25, 38);

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "12px Figtree, sans-serif";
      ctx.fillText(config.subtitle, 25, 55);

      // Draw legend
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.roundRect(15, height - 75, 130, 60, 10);
      ctx.fill();

      // Legend item 1
      ctx.strokeStyle = config.color1;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(25, height - 55);
      ctx.lineTo(50, height - 55);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Figtree, sans-serif";
      ctx.fillText(config.label1, 58, height - 51);

      // Legend item 2
      ctx.strokeStyle = config.color2;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(25, height - 32);
      ctx.lineTo(50, height - 32);
      ctx.stroke();

      ctx.fillStyle = config.color2;
      ctx.fillText(config.label2, 58, height - 28);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeGraph]);

  return (
    <div className="w-full h-full min-h-[350px] rounded-2xl overflow-hidden shadow-lg">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
};

export default SineCosineGraph;
