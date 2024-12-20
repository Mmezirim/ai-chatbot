import React, { useEffect } from 'react';

const MatrixCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = 'AZI TERMINAL AI ';
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = Array(Math.floor(columns)).fill(canvas.height);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#1F51FF';
      ctx.font = `${fontSize}px monospace`;

      rainDrops.forEach((y, index) => {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = index * fontSize;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[index] = 0;
        } else {
          rainDrops[index] += fontSize;
        }
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return <canvas id="matrix-canvas"></canvas>;
};

export default MatrixCanvas;
