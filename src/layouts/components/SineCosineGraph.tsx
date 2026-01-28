"use client";

import { useEffect, useRef } from "react";

interface SineCosineGraphProps {
  activeGraph?: number;
}

const SineCosineGraph = ({ activeGraph = 0 }: SineCosineGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

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
        title: "Linear & Quadratic",
        subtitle: "y = x and y = x²",
        color1: "#ffffff",
        color2: "#ffd700",
        func1: (x: number) => x / 3,
        func2: (x: number) => Math.pow(x / 2, 2) / 3,
        label1: "y = x",
        label2: "y = x²"
      },
      {
        title: "Circle Equation",
        subtitle: "x² + y² = r²",
        color1: "#ffffff",
        color2: "#90EE90",
        func1: (x: number) => Math.sqrt(Math.max(0, 4 - Math.pow(x, 2))),
        func2: (x: number) => -Math.sqrt(Math.max(0, 4 - Math.pow(x, 2))),
        label1: "upper half",
        label2: "lower half"
      },
      {
        title: "Trigonometric Functions",
        subtitle: "y = sin(x) and y = cos(x)",
        color1: "#ffffff",
        color2: "#ff6b6b",
        func1: (x: number) => Math.sin(x),
        func2: (x: number) => Math.cos(x),
        label1: "sin(x)",
        label2: "cos(x)"
      },
      {
        title: "Function Transformations",
        subtitle: "f(x) and f(x - 1) + 2",
        color1: "#ffffff",
        color2: "#da70d6",
        func1: (x: number) => Math.pow(x / 2, 2) / 3,
        func2: (x: number) => Math.pow((x - 1) / 2, 2) / 3 + 0.7,
        label1: "f(x) = x²",
        label2: "shifted"
      },
      {
        title: "Normal Distribution",
        subtitle: "Bell Curve",
        color1: "#ffffff",
        color2: "#00bfff",
        func1: (x: number) => Math.exp(-Math.pow(x, 2) / 2) * 2,
        func2: (x: number) => Math.exp(-Math.pow(x - 1, 2) / 1) * 1.5,
        label1: "μ = 0",
        label2: "μ = 1"
      },
      {
        title: "Derivatives",
        subtitle: "f(x) = x³ and f'(x) = 3x²",
        color1: "#ffffff",
        color2: "#ffa500",
        func1: (x: number) => Math.pow(x / 2, 3) / 2,
        func2: (x: number) => 3 * Math.pow(x / 2, 2) / 4,
        label1: "f(x) = x³",
        label2: "f'(x) = 3x²"
      },
      {
        title: "Exponential Growth",
        subtitle: "Modeling Applications",
        color1: "#ffffff",
        color2: "#32cd32",
        func1: (x: number) => Math.exp(x / 3) / 3 - 0.3,
        func2: (x: number) => Math.log(Math.max(0.1, x + 3)) / 2,
        label1: "eˣ",
        label2: "ln(x)"
      },
      {
        title: "Limits & Continuity",
        subtitle: "Analysis Foundations",
        color1: "#ffffff",
        color2: "#ff69b4",
        func1: (x: number) => Math.sin(x) / (x === 0 ? 0.001 : x) * 1.5,
        func2: (x: number) => 1.5,
        label1: "sin(x)/x",
        label2: "limit = 1"
      }
    ];

    const draw = () => {
      if (!ctx || !canvas) return;

      const width = canvas.width / 2;
      const height = canvas.height / 2;
      const centerY = height / 2;
      const centerX = width / 2;
      const amplitude = height * 0.25;

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
        const y = centerY - config.func2(x) * amplitude;
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
        const y = centerY - config.func1(x) * amplitude;
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
