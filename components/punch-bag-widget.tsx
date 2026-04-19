"use client";

import { useEffect, useRef, useState } from "react";

const MAX_VELOCITY = 0.32;
const HIT_IMPULSE = 0.1;
const DAMPING = 0.975;
const SPRING = 0.015;

let arcadeAudioContext: AudioContext | null = null;

function getArcadeAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  const AudioContextCtor =
    window.AudioContext ||
    ("webkitAudioContext" in window
      ? (window as typeof window & { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      : undefined);

  if (!AudioContextCtor) {
    return null;
  }

  if (!arcadeAudioContext) {
    arcadeAudioContext = new AudioContextCtor();
  }

  return arcadeAudioContext;
}

function playArcadeHit() {
  const context = getArcadeAudioContext();

  if (!context) {
    return;
  }
  const now = context.currentTime;
  const master = context.createGain();
  const thump = context.createOscillator();
  const body = context.createBufferSource();
  const impact = context.createBufferSource();
  const thumpFilter = context.createBiquadFilter();
  const bodyFilter = context.createBiquadFilter();
  const impactFilter = context.createBiquadFilter();
  const thumpGain = context.createGain();
  const bodyGain = context.createGain();
  const impactGain = context.createGain();

  const bodyBuffer = context.createBuffer(
    1,
    Math.floor(context.sampleRate * 0.12),
    context.sampleRate,
  );
  const bodyData = bodyBuffer.getChannelData(0);
  for (let i = 0; i < bodyData.length; i += 1) {
    const envelope = 1 - i / bodyData.length;
    bodyData[i] =
      (Math.random() * 2 - 1) * envelope * envelope * 0.65;
  }

  const impactBuffer = context.createBuffer(
    1,
    Math.floor(context.sampleRate * 0.018),
    context.sampleRate,
  );
  const impactData = impactBuffer.getChannelData(0);
  for (let i = 0; i < impactData.length; i += 1) {
    const envelope = 1 - i / impactData.length;
    impactData[i] =
      (Math.random() * 2 - 1) * envelope * 0.25;
  }

  body.buffer = bodyBuffer;
  impact.buffer = impactBuffer;

  thump.type = "sine";
  thump.frequency.setValueAtTime(72, now);
  thump.frequency.exponentialRampToValueAtTime(46, now + 0.11);

  thumpFilter.type = "lowpass";
  thumpFilter.frequency.setValueAtTime(170, now);

  bodyFilter.type = "lowpass";
  bodyFilter.frequency.setValueAtTime(260, now);
  bodyFilter.Q.setValueAtTime(0.2, now);

  impactFilter.type = "bandpass";
  impactFilter.frequency.setValueAtTime(520, now);
  impactFilter.Q.setValueAtTime(0.5, now);

  thumpGain.gain.setValueAtTime(0.0001, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.16, now + 0.01);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

  bodyGain.gain.setValueAtTime(0.0001, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.065, now + 0.008);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  impactGain.gain.setValueAtTime(0.0001, now);
  impactGain.gain.exponentialRampToValueAtTime(0.008, now + 0.001);
  impactGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

  master.gain.setValueAtTime(0.6, now);

  thump.connect(thumpFilter);
  thumpFilter.connect(thumpGain);
  thumpGain.connect(master);

  body.connect(bodyFilter);
  bodyFilter.connect(bodyGain);
  bodyGain.connect(master);

  impact.connect(impactFilter);
  impactFilter.connect(impactGain);
  impactGain.connect(master);

  master.connect(context.destination);

  thump.start(now);
  body.start(now);
  impact.start(now);
  thump.stop(now + 0.17);
}

export function PunchBagWidget() {
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const [position, setPosition] = useState(0);
  const [impactCompression, setImpactCompression] = useState(0);

  useEffect(() => {
    let previous = performance.now();

    function tick(now: number) {
      const delta = Math.min(24, now - previous);
      previous = now;

      const step = delta / 16.67;
      velocityRef.current += -positionRef.current * SPRING * step;
      velocityRef.current *= DAMPING ** step;
      positionRef.current += velocityRef.current * step;

      if (Math.abs(positionRef.current) < 0.001 && Math.abs(velocityRef.current) < 0.001) {
        positionRef.current = 0;
        velocityRef.current = 0;
      }

      setPosition(positionRef.current);
      frameRef.current = window.requestAnimationFrame(tick);
    }

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (impactCompression === 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setImpactCompression(0);
    }, 140);

    return () => window.clearTimeout(timeout);
  }, [impactCompression]);

  function handlePunch() {
    const direction =
      velocityRef.current > 0.01 ? 1 : velocityRef.current < -0.01 ? -1 : 1;
    velocityRef.current = Math.max(
      -MAX_VELOCITY,
      Math.min(MAX_VELOCITY, velocityRef.current + HIT_IMPULSE * direction),
    );

    setImpactCompression(1);
    playArcadeHit();
  }

  const depth = Math.max(-1, Math.min(1, position * 12));
  const bagScaleX = 1 + impactCompression * 0.1 + depth * 0.05;
  const bagScaleY = 1 - impactCompression * 0.14 - Math.max(0, depth) * 0.03;
  const bagTranslateY = Math.max(-8, Math.min(12, depth * 10));
  const bagRotate = Math.max(-5, Math.min(5, velocityRef.current * 55));
  const bagTilt = Math.max(-10, Math.min(12, depth * 10));
  const shadowScaleX = 1 + Math.abs(depth) * 0.35;
  const shadowScaleY = 1 - Math.abs(depth) * 0.18;
  const shadowBlur = 18 + Math.abs(depth) * 18;

  return (
    <section className="punch-widget arcade-widget" aria-labelledby="punch-widget-title">
      <h3 id="punch-widget-title" className="arcade-widget-title">
        Work off your frustration here
      </h3>

      <div className="punch-stage">
        <button
          type="button"
          className="bag-button speed-bag-button"
          onClick={handlePunch}
          aria-label="Hit the speed bag"
          title="Hit the speed bag"
        >
          <div className="speed-bag-rig">
            <div className="speed-bag-mount" aria-hidden="true" />
            <div className="speed-bag-swivel" aria-hidden="true" />
            <div
              className="speed-bag-motion"
              style={
                {
                  "--bag-scale-x": `${bagScaleX}`,
                  "--bag-scale-y": `${bagScaleY}`,
                  "--bag-translate-y": `${bagTranslateY}px`,
                  "--bag-rotate": `${bagRotate}deg`,
                  "--bag-tilt": `${bagTilt}deg`,
                  "--bag-shadow-scale-x": `${shadowScaleX}`,
                  "--bag-shadow-scale-y": `${shadowScaleY}`,
                  "--bag-shadow-blur": `${shadowBlur}px`,
                } as React.CSSProperties
              }
            >
              <div className="speed-bag-hanger" aria-hidden="true" />
              <div className="bag-shape speed-bag-shape" aria-hidden="true">
                <div className="speed-bag-laces" />
                <div className="speed-bag-seam" />
                <div className="speed-bag-highlight" />
              </div>
              <div className="speed-bag-shadow" aria-hidden="true" />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
