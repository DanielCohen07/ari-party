"use client";

import { useEffect, useState } from "react";

interface Leaf {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  flip: boolean;
}

// SVG olive leaf path
function OliveLeaf({ size, flip }: { size: number; flip: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      {/* Stem */}
      <path d="M12 22 Q12 14 12 6" stroke="#4a7c3f" strokeWidth="1.2" strokeLinecap="round" />
      {/* Leaf shape */}
      <ellipse cx="12" cy="11" rx="5.5" ry="9" fill="#5a9e4a" opacity="0.85"
        transform="rotate(-15 12 11)" />
      <ellipse cx="12" cy="11" rx="5.5" ry="9" fill="#6dbf5a" opacity="0.4"
        transform="rotate(-15 12 11)" />
      {/* Vein */}
      <path d="M12 4 Q10 11 12 18" stroke="#3d6e34" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export default function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const generated: Leaf[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,        // 2–98 vw
      delay: Math.random() * 18,         // 0–18s stagger
      duration: 12 + Math.random() * 10, // 12–22s fall
      size: 18 + Math.random() * 16,     // 18–34px
      flip: Math.random() > 0.5,
    }));
    setLeaves(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 5 }}>
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.x}vw`,
            top: "-40px",
            animation: `leafDrift ${leaf.duration}s ${leaf.delay}s linear infinite`,
            willChange: "transform, opacity",
          }}
        >
          <OliveLeaf size={leaf.size} flip={leaf.flip} />
        </div>
      ))}
    </div>
  );
}
