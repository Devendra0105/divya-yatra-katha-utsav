import { useEffect } from "react";

/**
 * Marks every [data-reveal] / [data-observe] element with data-seen="true" the first time it
 * scrolls into view; styles.css turns that attribute into the entrance animation.
 * threshold 0 on purpose: tall blocks would never reach a higher visibility ratio.
 */
export function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal],[data-observe]"));
    const markSeen = (el: Element) => el.setAttribute("data-seen", "true");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      nodes.forEach(markSeen);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          markSeen(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
