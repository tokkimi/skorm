"use client";

import { ReactNode, useRef } from "react";

export function HorizontalRail({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rail = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const card = rail.current?.querySelector<HTMLElement>(":scope > *");
    const amount = card?.getBoundingClientRect().width || rail.current?.clientWidth || 360;
    rail.current?.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className={`media-rail-wrap ${className}`}>
      <button className="rail-dot rail-dot-left" onClick={() => move(-1)} aria-label="Reculer le rail" />
      <div className="media-rail" ref={rail}>
        {children}
      </div>
      <button className="rail-dot rail-dot-right" onClick={() => move(1)} aria-label="Avancer le rail" />
    </div>
  );
}
