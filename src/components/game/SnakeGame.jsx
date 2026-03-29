"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const GRID_SIZE = 20;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;
const TICK_MS = 200;
const INITIAL_SNAKE = [42, 41, 40];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2 dark:focus-visible:ring-[#2aa198] dark:focus-visible:ring-offset-[#00212b]";

function panelClass(isDark) {
  return `rounded-2xl border shadow-lg transition-colors duration-300 p-4 sm:p-6 ${
    isDark
      ? "border-[#586e75]/80 bg-[#00212b]/95 text-[#93a1a1] shadow-black/40"
      : "border-[#93a1a1]/70 bg-[#fdf6e3]/95 text-[#586e75] shadow-[#002b36]/10"
  }`;
}

export default function SnakeGame() {
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [foodPosition, setFoodPosition] = useState(null);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(null);

  const directionRef = useRef("RIGHT");
  const snakeRef = useRef(INITIAL_SNAKE);
  const foodRef = useRef(null);
  const scoreRef = useRef(0);
  const intervalRef = useRef(null);

  const clearLoop = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const spawnFood = useCallback((snakeCells) => {
    let pos;
    do {
      pos = Math.floor(Math.random() * CELL_COUNT);
    } while (snakeCells.includes(pos));
    foodRef.current = pos;
    setFoodPosition(pos);
  }, []);

  const resetRefs = useCallback(() => {
    directionRef.current = "RIGHT";
    snakeRef.current = [...INITIAL_SNAKE];
    foodRef.current = null;
    scoreRef.current = 0;
  }, []);

  const onKeyDown = useCallback((event) => {
    const keyDirectionMap = {
      ArrowUp: "UP",
      ArrowDown: "DOWN",
      ArrowLeft: "LEFT",
      ArrowRight: "RIGHT",
    };
    const newDirection = keyDirectionMap[event.key];
    if (!newDirection) return;
    event.preventDefault();
    const opposite = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
    if (newDirection !== opposite[directionRef.current]) {
      directionRef.current = newDirection;
    }
  }, []);

  const stopGame = useCallback(() => {
    clearLoop();
    setIsRunning(false);
    window.removeEventListener("keydown", onKeyDown);
  }, [clearLoop, onKeyDown]);

  const tick = useCallback(() => {
    const head = snakeRef.current[0];
    const dir = directionRef.current;
    let newHead;
    switch (dir) {
      case "UP":
        newHead = head - GRID_SIZE;
        break;
      case "DOWN":
        newHead = head + GRID_SIZE;
        break;
      case "LEFT":
        newHead = head - 1;
        break;
      default:
        newHead = head + 1;
    }

    const hitWall =
      newHead < 0 ||
      newHead >= CELL_COUNT ||
      (dir === "LEFT" && head % GRID_SIZE === 0) ||
      (dir === "RIGHT" && newHead % GRID_SIZE === 0);

    if (hitWall || snakeRef.current.includes(newHead)) {
      clearLoop();
      setIsRunning(false);
      window.removeEventListener("keydown", onKeyDown);
      setGameOver(`Game over · Score ${scoreRef.current}`);
      return;
    }

    let nextSnake;
    if (newHead === foodRef.current) {
      nextSnake = [newHead, ...snakeRef.current];
      scoreRef.current += 10;
      setScore(scoreRef.current);
      spawnFood(nextSnake);
    } else {
      nextSnake = [newHead, ...snakeRef.current.slice(0, -1)];
    }
    snakeRef.current = nextSnake;
    setSnake(nextSnake);
  }, [clearLoop, onKeyDown, spawnFood]);

  const startGame = useCallback(() => {
    clearLoop();
    window.removeEventListener("keydown", onKeyDown);
    resetRefs();
    setGameOver(null);
    scoreRef.current = 0;
    setScore(0);
    setSnake([...INITIAL_SNAKE]);
    snakeRef.current = [...INITIAL_SNAKE];
    spawnFood([...INITIAL_SNAKE]);
    setIsRunning(true);
    window.addEventListener("keydown", onKeyDown);
    intervalRef.current = window.setInterval(tick, TICK_MS);
  }, [clearLoop, onKeyDown, resetRefs, spawnFood, tick]);

  useEffect(() => {
    return () => {
      clearLoop();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [clearLoop, onKeyDown]);

  const isSnakeCell = (index) => snake.includes(index);
  const isFoodCell = (index) => foodPosition != null && index === foodPosition;

  return (
    <div className={panelClass(isDark)}>
      <h2
        className={`text-lg font-bold text-center mb-4 ${isDark ? "text-[#fdf6e3]" : "text-[#002b36]"}`}
      >
        Snake
      </h2>
      <p
        className={`text-xs text-center mb-4 ${isDark ? "text-[#657b83]" : "text-[#586e75]"}`}
      >
        Arrow keys to steer · Start locks focus to the page
      </p>

      <div
        className="mx-auto w-full max-w-[min(100%,420px)] aspect-square border-2 rounded-xl overflow-hidden select-none touch-none"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          gap: 1,
          backgroundColor: isDark ? "#073642" : "#e8e4d9",
          borderColor: isDark ? "#586e75" : "#93a1a1",
        }}
        role="img"
        aria-label="Snake game board"
      >
        {Array.from({ length: CELL_COUNT }, (_, index) => (
          <div
            key={index}
            className="min-w-0 min-h-0"
            style={{
              backgroundColor: isSnakeCell(index)
                ? isDark
                  ? "#2aa198"
                  : "#2075c7"
                : isFoodCell(index)
                  ? isDark
                    ? "#cb4b16"
                    : "#dc322f"
                  : isDark
                    ? "#002b36"
                    : "#eee8d5",
            }}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={isRunning ? stopGame : startGame}
          className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors shadow-md hover:shadow-lg active:scale-[0.98] ${focusRing} ${
            isDark
              ? "bg-[#268bd2] text-[#fdf6e3] hover:bg-[#2aa198]"
              : "bg-[#2075c7] text-white hover:bg-[#1861a8]"
          }`}
        >
          {isRunning ? "Stop" : "Start game"}
        </button>
        <p
          className={`text-sm font-semibold tabular-nums ${isDark ? "text-[#eee8d5]" : "text-[#002b36]"}`}
        >
          Score: {score}
        </p>
      </div>

      {gameOver && (
        <p
          className={`mt-4 text-center text-sm font-medium rounded-lg px-3 py-2 ${
            isDark
              ? "bg-[#073642] text-[#cb4b16]"
              : "bg-[#eee8d5] text-[#cb4b16]"
          }`}
          role="status"
        >
          {gameOver}
        </p>
      )}
    </div>
  );
}
