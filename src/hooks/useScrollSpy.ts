"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.3,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}