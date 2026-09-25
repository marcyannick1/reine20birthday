import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const COLORS = ["#E8537D", "#FF9DB9", "#FFD3E0", "#C23566", "#F7A8C0"];

function heart(ctx, x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s, y, x - s, y + s * 0.35);
  ctx.bezierCurveTo(x - s, y + s * 0.8, x, y + s * 1.1, x, y + s * 1.3);
  ctx.bezierCurveTo(x, y + s * 1.1, x + s, y + s * 0.8, x + s, y + s * 0.35);
  ctx.bezierCurveTo(x + s, y, x, y, x, y + s * 0.3);
  ctx.fill();
}

const Confetti = forwardRef(function Confetti(_, ref) {
  const canvasRef = useRef(null);
  const parts = useRef([]);
  const running = useRef(false);

  useEffect(() => {
    const cv = canvasRef.current;
    const size = () => {
      cv.width = innerWidth * devicePixelRatio;
      cv.height = innerHeight * devicePixelRatio;
    };
    size();
    addEventListener("resize", size);
    return () => removeEventListener("resize", size);
  }, []);

  const tick = () => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    const d = devicePixelRatio;
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts.current = parts.current.filter((p) => p.life > 0);
    for (const p of parts.current) {
      p.vy += 0.18; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
      ctx.save();
      ctx.globalAlpha = Math.min(1, p.life / 30);
      ctx.fillStyle = p.c;
      ctx.translate(p.x * d, p.y * d);
      ctx.rotate(p.rot);
      if (p.heart) heart(ctx, 0, -p.r * d, p.r * d * 1.2);
      else ctx.fillRect(-p.r * d, (-p.r * d) / 2, p.r * 2 * d, p.r * d);
      ctx.restore();
    }
    if (parts.current.length) requestAnimationFrame(tick);
    else {
      running.current = false;
      ctx.clearRect(0, 0, cv.width, cv.height);
    }
  };

  useImperativeHandle(ref, () => ({
    burst(x, y, n) {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      for (let k = 0; k < n; k++) {
        const a = Math.random() * Math.PI * 2;
        const s = 3 + Math.random() * 7;
        parts.current.push({
          x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, r: 3 + Math.random() * 4,
          c: COLORS[k % COLORS.length], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
          life: 90 + Math.random() * 40, heart: Math.random() < 0.25,
        });
      }
      if (!running.current) {
        running.current = true;
        requestAnimationFrame(tick);
      }
    },
  }));

  return <canvas ref={canvasRef} className="confetti" aria-hidden="true" />;
});

export default Confetti;
