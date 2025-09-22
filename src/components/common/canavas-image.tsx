import React, { useEffect, useRef } from "react";

interface CanvasImageProps {
  url: string;
  uid: string;
  onReady?: (dataUrl: string) => void; // 👈 callback for magnifier
}

const CanvasImage: React.FC<CanvasImageProps> = ({ url, uid, onReady }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw UID text
      ctx.font = "bold 16px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";

      const x = canvas.width - 68;
      const y = canvas.height / 2 + 33;
      ctx.fillText(uid, x, y);

      if (onReady) {
        onReady(canvas.toDataURL()); // 👈 pass image back
      }
    };
  }, [url, uid, onReady]);

  return <canvas ref={canvasRef} style={{ maxWidth: "300px" }} />;
};

export default CanvasImage;
