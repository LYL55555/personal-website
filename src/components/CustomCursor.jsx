"use client";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  memo,
} from "react";
import { usePathname } from "next/navigation";
import "../styles/cursor.css";

/** Keep cursor position across routes/remounts (avoid 0,0 reset). */
let lastPointerClient = { x: 0, y: 0 };

const CustomCursor = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState(() => ({ ...lastPointerClient }));
  const [cursorType, setCursorType] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback((e) => {
    requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      lastPointerClient = { x: clientX, y: clientY };
      setPosition(lastPointerClient);

      const target = e.target;

      if (
        target.matches('a, button, [role="button"]') ||
        target.closest('a, button, [role="button"]')
      ) {
        setCursorType("link");
      } else if (
        target.matches(
          "input, textarea, [contenteditable], p, h1, h2, h3, h4, h5, h6, span",
        )
      ) {
        setCursorType("text");
      } else if (target.disabled || target.matches(".disabled, [disabled]")) {
        setCursorType("not-allowed");
      } else if (target.matches(".loading, .processing, .busy-cursor")) {
        setCursorType("busy");
      } else {
        setCursorType("");
      }
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", updatePosition, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    if (typeof document !== "undefined" && document.hasFocus()) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [updatePosition, handleMouseEnter, handleMouseLeave]);

  useLayoutEffect(() => {
    setPosition({ ...lastPointerClient });
  }, [pathname]);

  return (
    <div
      className={`custom-cursor ${cursorType}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
};

export default memo(CustomCursor);
