"use client";

import { useEffect, useMemo, useState } from "react";

type Bubble = {
  id: string;
  side: "left" | "right";
  size: number;
};

const ROW_HEIGHT = 42;
const MAX_COLS = 12;

function seeded(seed: string, min: number, max: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const n = (h % 10000) / 10000;
  return min + n * (max - min);
}

export function BubbleWrapLayer() {
  const [rows, setRows] = useState(12);
  const [gutterWidth, setGutterWidth] = useState(120);

  const [popped, setPopped] = useState<Record<string, boolean>>({});

function playPop() {
  const audio = new Audio("/pop.mp3");
  audio.volume = 0.2;
  audio.play().catch(() => {});
}
function handlePop(id: string) {
  if (popped[id]) return;

  playPop(); // 👈 ADD THIS

  setPopped((prev) => {
    const next = { ...prev, [id]: true };

    const total = bubbles.length;
    const poppedCount = Object.keys(next).length;

    if (poppedCount / total > 0.75) {
      return {};
    }

    return next;
  });
}

  useEffect(() => {
    function update() {
      const shell = document.querySelector(".shell") as HTMLElement;
      if (!shell) return;

      const rect = shell.getBoundingClientRect();

      const leftSpace = rect.left;
      const rightSpace = window.innerWidth - rect.right;

      // 🔑 single shared width (no asymmetry possible)
      const width = Math.max(
        60,
        Math.floor((Math.min(leftSpace, rightSpace) - 10) / 20) * 30
      );

      setGutterWidth(width);
      setRows(Math.ceil(window.innerHeight / ROW_HEIGHT));
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const bubbles = useMemo(() => {
    return ["left", "right"].flatMap((side) =>
      Array.from({ length: rows * MAX_COLS }, (_, i) => {
        const key = `${side}-${i}`;

        return {
          id: key,
          side: side as "left" | "right",
          size: seeded(key, 20, 28),
        };
      })
    );
  }, [rows]);

  return (
    <>
      {/* LEFT */}
      <div
        className="bubble-gutter"
        style={{
          left: 0,
          width: gutterWidth,
        }}
      >
        {bubbles
          .filter((b) => b.side === "left")
          .map((b) => (
           <div
  key={b.id}
  className={`bubble ${popped[b.id] ? "popped" : ""}`}
  onClick={() => handlePop(b.id)}
  style={{
    width: b.size,
    height: b.size,
  }}
/>
          ))}
      </div>

      {/* RIGHT */}
      <div
        className="bubble-gutter"
        style={{
          right: 0,
          width: gutterWidth,
        }}
      >
        {bubbles
          .filter((b) => b.side === "right")
          .map((b) => (
            <div
  key={b.id}
  className={`bubble ${popped[b.id] ? "popped" : ""}`}
  onClick={() => handlePop(b.id)}
  style={{
    width: b.size,
    height: b.size,
  }}
/>
          ))}
      </div>
    </>
  );
}