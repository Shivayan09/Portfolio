"use client";

import { useEffect, useRef } from "react";

const MAX_PARTICLES = 220;
const EMIT_PER_SECOND = 130;
const DESIGN_SIZE = 400; // geometry below is authored against this, then scaled
const ROCKET_W = 46;
const ROCKET_H = 165;
const FLAME_LENGTH = 92;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

/**
 * Rocket climbing under sustained thrust, holding near the middle with a slow
 * bob and a little tilt, over nothing but its own exhaust.
 *
 * Canvas rather than CSS because the plume is a particle system.
 */
export default function RocketLaunch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rootStyle = getComputedStyle(document.documentElement);
    const token = (name: string, fallback: string) =>
      rootStyle.getPropertyValue(name).trim() || fallback;

    const acid = token("--color-acid", "#ccff00");
    const bone = token("--color-bone", "#f2f3ee");

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** Rocket outline, drawn about its own centre in scaled units. */
    const drawRocket = (scale: number) => {
      const w = ROCKET_W * scale;
      const h = ROCKET_H * scale;

      ctx.lineJoin = "round";
      ctx.lineWidth = Math.max(1, 1.5 * scale);

      // Fins.
      ctx.fillStyle = acid;
      ctx.globalAlpha = 0.18;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(side * w * 0.5, h * 0.04);
        ctx.lineTo(side * w * 1.02, h * 0.42);
        ctx.lineTo(side * w * 0.5, h * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 0.75;
        ctx.strokeStyle = acid;
        ctx.stroke();
        ctx.globalAlpha = 0.18;
      }

      // Hull: nose cone into body, filled so the page shows through nothing
      // but the outline.
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.5);
      ctx.quadraticCurveTo(w * 0.5, -h * 0.24, w * 0.5, -h * 0.1);
      ctx.lineTo(w * 0.5, h * 0.3);
      ctx.lineTo(-w * 0.5, h * 0.3);
      ctx.lineTo(-w * 0.5, -h * 0.1);
      ctx.quadraticCurveTo(-w * 0.5, -h * 0.24, 0, -h * 0.5);
      ctx.closePath();
      ctx.fillStyle = "#0c0e09";
      ctx.fill();
      ctx.strokeStyle = acid;
      ctx.stroke();

      // Nose band and a highlight down the lit side.
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, -h * 0.1);
      ctx.lineTo(w * 0.5, -h * 0.1);
      ctx.stroke();
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      ctx.moveTo(-w * 0.22, -h * 0.04);
      ctx.lineTo(-w * 0.22, h * 0.24);
      ctx.stroke();

      // Window.
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(0, h * 0.02, w * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = acid;
      ctx.fill();

      // Nozzle.
      ctx.beginPath();
      ctx.moveTo(-w * 0.32, h * 0.3);
      ctx.lineTo(-w * 0.46, h * 0.44);
      ctx.lineTo(w * 0.46, h * 0.44);
      ctx.lineTo(w * 0.32, h * 0.3);
      ctx.closePath();
      ctx.fillStyle = "#0c0e09";
      ctx.fill();
      ctx.strokeStyle = acid;
      ctx.stroke();
    };

    let last = 0;

    const draw = (now: number) => {
      // The canvas is display:none below `lg`, so skip the work entirely there.
      if (width === 0 || height === 0) return;

      const dt = still ? 0 : Math.min(0.05, (now - last) / 1000 || 0);
      last = now;

      const t = now / 1000;
      const scale = Math.min(width, height) / DESIGN_SIZE;
      const bob = still ? 0 : Math.sin(t * 1.6) * 6 * scale;
      const sway = still ? 0 : Math.sin(t * 1.1) * 3 * scale;
      const tilt = still ? 0 : Math.sin(t * 0.9) * 0.022;

      const rocketX = width / 2 + sway;
      const rocketY = height * 0.4 + bob;
      const nozzleY = rocketY + ROCKET_H * scale * 0.44;

      ctx.clearRect(0, 0, width, height);

      // Engine glow behind the plume.
      const flicker = 0.85 + 0.09 * Math.sin(t * 23) + 0.06 * Math.sin(t * 37);
      const flameLength = FLAME_LENGTH * scale * (still ? 0.9 : flicker);
      const glow = ctx.createRadialGradient(
        rocketX,
        nozzleY,
        0,
        rocketX,
        nozzleY,
        flameLength * 1.6,
      );
      glow.addColorStop(0, "rgba(204,255,0,0.28)");
      glow.addColorStop(0.5, "rgba(204,255,0,0.07)");
      glow.addColorStop(1, "rgba(204,255,0,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(rocketX, nozzleY, flameLength * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Exhaust particles, emitted at the nozzle and falling away behind.
      const toEmit = still ? 0 : EMIT_PER_SECOND * dt;
      for (let i = 0; i < toEmit; i++) {
        if (particles.length >= MAX_PARTICLES) break;
        const maxLife = 0.5 + Math.random() * 0.7;
        particles.push({
          x: rocketX + (Math.random() - 0.5) * 19 * scale,
          y: nozzleY + Math.random() * 9 * scale,
          vx: (Math.random() - 0.5) * 46 * scale,
          vy: (90 + Math.random() * 150) * scale,
          life: maxLife,
          maxLife,
          size: (2 + Math.random() * 3.6) * scale,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.98;
        p.vy += 40 * scale * dt;

        const age = p.life / p.maxLife;
        ctx.globalAlpha = age * 0.6;
        ctx.fillStyle = age > 0.7 ? bone : acid;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * age, 0, Math.PI * 2);
        ctx.fill();
      }

      // Flame: an acid tongue with a hot core.
      const flame = ctx.createLinearGradient(
        rocketX,
        nozzleY,
        rocketX,
        nozzleY + flameLength,
      );
      flame.addColorStop(0, "rgba(204,255,0,0.95)");
      flame.addColorStop(0.55, "rgba(204,255,0,0.4)");
      flame.addColorStop(1, "rgba(204,255,0,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = flame;
      ctx.beginPath();
      ctx.moveTo(rocketX - 20 * scale, nozzleY);
      ctx.quadraticCurveTo(
        rocketX,
        nozzleY + flameLength * 1.05,
        rocketX + 20 * scale,
        nozzleY,
      );
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = bone;
      ctx.globalAlpha = 0.75;
      ctx.beginPath();
      ctx.moveTo(rocketX - 8 * scale, nozzleY);
      ctx.quadraticCurveTo(
        rocketX,
        nozzleY + flameLength * 0.5,
        rocketX + 8 * scale,
        nozzleY,
      );
      ctx.closePath();
      ctx.fill();

      // Rocket last, so it sits over its own glow.
      ctx.save();
      ctx.translate(rocketX, rocketY);
      ctx.rotate(tilt);
      drawRocket(scale);
      ctx.restore();

      ctx.globalAlpha = 1;
    };

    let frame = 0;
    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (still) draw(0);
    else frame = requestAnimationFrame(loop);

    const observer = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="hidden h-[400px] w-full max-w-[400px] justify-self-end lg:block"
    />
  );
}
