"use client";

export function MouseGradient() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background:
          "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(79,70,229,0.06), transparent 55%)",
      }}
      aria-hidden
    />
  );
}
