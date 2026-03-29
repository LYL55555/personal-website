"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import {
  TOTAL_ROUNDS,
  BASE_SCORE,
  CONSOLATION_SCORE,
  SPEED_THRESHOLDS,
  GENERATION_OPTIONS,
  resolveGenerationRange,
  buildRoundChoices,
  formatMultilingual,
  typesLine,
  calculateTimeBonus,
  getPerformanceRating,
  titleCaseName,
} from "@/lib/pokemonQuiz";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2 dark:focus-visible:ring-[#2aa198] dark:focus-visible:ring-offset-[#00212b]";

function panelClass(isDark) {
  return `rounded-2xl border shadow-lg transition-colors duration-300 p-4 sm:p-5 ${
    isDark
      ? "border-[#586e75]/80 bg-[#00212b]/95 text-[#93a1a1] shadow-black/40"
      : "border-[#93a1a1]/70 bg-[#fdf6e3]/95 text-[#586e75] shadow-[#002b36]/10"
  }`;
}

function btnClass(isDark, primary) {
  const base = `inline-flex items-center justify-center gap-1.5 text-sm font-semibold rounded-xl px-4 py-2.5 min-h-[2.75rem] transition-all duration-200 ${focusRing} disabled:pointer-events-none disabled:opacity-50`;
  if (primary) {
    return `${base} shadow-md hover:shadow-lg active:scale-[0.98] ${
      isDark
        ? "bg-[#268bd2] text-[#fdf6e3] hover:bg-[#2aa198]"
        : "bg-[#2075c7] text-white hover:bg-[#1861a8]"
    }`;
  }
  return `${base} border-2 font-medium shadow-sm hover:shadow ${
    isDark
      ? "border-[#586e75] text-[#93a1a1] hover:border-[#93a1a1] hover:text-[#fdf6e3] bg-[#002b36]/50"
      : "border-[#93a1a1] text-[#586e75] hover:border-[#586e75] hover:text-[#002b36] bg-white/40"
  }`;
}

const STAT_ROWS = [
  ["hp", 255, "#dc322f"],
  ["attack", 190, "#cb4b16"],
  ["defense", 230, "#268bd2"],
  ["speed", 180, "#2aa198"],
];

function SectionLabel({ children, isDark }) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.12em] mb-2 ${
        isDark ? "text-[#657b83]" : "text-[#93a1a1]"
      }`}
    >
      {children}
    </p>
  );
}

function RoundProgress({ round, total, isDark }) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`Round ${round} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const done = n < round;
        const current = n === round;
        return (
          <span
            key={n}
            className={`h-2 flex-1 max-w-[3rem] rounded-full transition-colors duration-300 ${
              done
                ? isDark
                  ? "bg-[#2aa198]/90"
                  : "bg-[#2075c7]/85"
                : current
                  ? isDark
                    ? "bg-[#268bd2] ring-2 ring-[#268bd2]/40 ring-offset-1 ring-offset-[#00212b]"
                    : "bg-[#2075c7] ring-2 ring-[#2075c7]/35 ring-offset-1 ring-offset-[#fdf6e3]"
                  : isDark
                    ? "bg-[#073642]"
                    : "bg-[#d2cec4]"
            }`}
          />
        );
      })}
    </div>
  );
}

function QuizSkeleton({ isDark, reduceMotion }) {
  const pulse = reduceMotion ? "" : "animate-pulse";
  const block = (cls) =>
    `${cls} rounded-lg ${
      isDark ? "bg-[#073642]" : "bg-[#e8e4d9]"
    } ${pulse}`;
  return (
    <div className="grid grid-cols-[minmax(88px,112px)_1fr] sm:grid-cols-[minmax(104px,128px)_1fr] gap-4">
      <div>
        <SectionLabel isDark={isDark}>Sprite</SectionLabel>
        <div
          className={`rounded-2xl p-3 flex items-center justify-center aspect-square max-h-[128px] ${
            isDark
              ? "bg-gradient-to-b from-[#073642] to-[#002b36] ring-1 ring-white/5"
              : "bg-gradient-to-b from-white to-[#e8e4d9] ring-1 ring-[#002b36]/5 shadow-inner"
          }`}
        >
          <div className={`${block("h-20 w-20")} rounded-xl`} />
        </div>
      </div>
      <div className="min-w-0 space-y-3">
        <div>
          <SectionLabel isDark={isDark}>Types</SectionLabel>
          <div className={block("h-4 w-3/4")} />
        </div>
        <div className="space-y-2">
          <div className={block("h-3 w-full")} />
          <div className={block("h-3 w-2/3")} />
        </div>
        <div>
          <SectionLabel isDark={isDark}>Base stats</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {STAT_ROWS.map(([statKey]) => (
              <div key={statKey} className="space-y-1">
                <div className={block("h-2.5 w-16")} />
                <div className={block("h-2 w-full")} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-full mt-2">
        <SectionLabel isDark={isDark}>Choose the Pokémon</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-xl border-2 px-3 py-3 min-h-[4rem] ${
                isDark
                  ? "border-[#586e75]/60 bg-[#002b36]/40"
                  : "border-[#93a1a1]/40 bg-white/40"
              }`}
            >
              <div className={block("h-4 w-4/5")} />
              <div className={`${block("h-3 w-3/5")} mt-2 ml-5`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatMeter({ label, value, max, color, isDark, reduceMotion }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline gap-2 text-[11px]">
        <span
          className={`font-bold uppercase tracking-wide ${isDark ? "text-[#839496]" : "text-[#657b83]"}`}
        >
          {label}
        </span>
        <span className="tabular-nums font-semibold opacity-90">{value}</span>
      </div>
      <div
        className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-[#073642]" : "bg-[#e8e4d9]"}`}
        aria-hidden
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 120, damping: 18 }
          }
        />
      </div>
    </div>
  );
}

export default function PokemonQuiz() {
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState("intro");
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [choices, setChoices] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [revealed, setRevealed] = useState(null);
  const [generationId, setGenerationId] = useState("1");

  const roundStartRef = useRef(0);
  const activeRangeRef = useRef({ min: 1, max: 151 });
  const loadingRef = useRef(false);
  const abortRef = useRef(null);
  const phaseRef = useRef(phase);
  const revealedRef = useRef(revealed);
  const choicesRef = useRef(choices);
  const pickAnswerRef = useRef(() => {});
  const nextRoundRef = useRef(() => {});

  loadingRef.current = loading;
  phaseRef.current = phase;
  revealedRef.current = revealed;
  choicesRef.current = choices;

  const [a11yMsg, setA11yMsg] = useState("");
  const [copyFlash, setCopyFlash] = useState(false);

  const fadeProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
      };

  const runBuildAndApply = useCallback(async (signal) => {
    const { min, max } = activeRangeRef.current;
    const data = await buildRoundChoices(min, max, signal);
    if (signal.aborted) return;
    setChoices(data.choices);
    setCorrectIndex(data.correctIndex);
    roundStartRef.current =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    setPhase("playing");
  }, []);

  const loadRound = useCallback(async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const { signal } = ac;
    setLoading(true);
    setError(null);
    setRevealed(null);
    setPhase("loadingRound");
    try {
      await runBuildAndApply(signal);
      if (abortRef.current !== ac) return;
    } catch (e) {
      if (e?.name === "AbortError" || signal.aborted) return;
      setError(e?.message || "Failed to load Pokémon. Try again.");
      setPhase("intro");
    } finally {
      if (abortRef.current === ac) {
        setLoading(false);
        abortRef.current = null;
      }
    }
  }, [runBuildAndApply]);

  const startGame = useCallback(async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const { signal } = ac;
    setError(null);
    setLoading(true);
    setScore(0);
    setRound(1);
    setPhase("loadingRound");
    setChoices([]);
    try {
      const range = await resolveGenerationRange(generationId, signal);
      if (signal.aborted || abortRef.current !== ac) return;
      activeRangeRef.current = { min: range.min, max: range.max };
      await runBuildAndApply(signal);
      if (signal.aborted || abortRef.current !== ac) return;
    } catch (e) {
      if (e?.name === "AbortError" || signal.aborted) return;
      setError(e?.message || "Failed to start. Check your connection.");
      setPhase("intro");
    } finally {
      if (abortRef.current === ac) {
        setLoading(false);
        abortRef.current = null;
      }
    }
  }, [generationId, runBuildAndApply]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const pickAnswer = (index) => {
    if (phase !== "playing" || revealed !== null) return;
    const end =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const seconds = (end - roundStartRef.current) / 1000;
    const correct = index === correctIndex;
    const correctMon = choices[correctIndex];

    if (correct) {
      const { bonus, speedLabel } = calculateTimeBonus(seconds);
      const points = BASE_SCORE + bonus;
      setScore((s) => s + points);
      setRevealed({
        correct: true,
        pickedIndex: index,
        seconds,
        speedLabel,
        bonus,
        points,
        correctMon,
      });
    } else {
      setScore((s) => s + CONSOLATION_SCORE);
      setRevealed({
        correct: false,
        pickedIndex: index,
        seconds,
        correctMon,
        points: CONSOLATION_SCORE,
      });
    }
    setPhase("feedback");
  };

  const nextRound = () => {
    if (loadingRef.current) return;
    if (round >= TOTAL_ROUNDS) {
      setPhase("complete");
      return;
    }
    setRound((r) => r + 1);
    loadRound();
  };

  pickAnswerRef.current = pickAnswer;
  nextRoundRef.current = nextRound;

  useEffect(() => {
    const onKey = (e) => {
      const el = e.target;
      if (
        el instanceof HTMLElement &&
        el.closest("input, select, textarea, [contenteditable=true]")
      ) {
        return;
      }
      if (loadingRef.current) return;

      const ph = phaseRef.current;
      const rev = revealedRef.current;
      const ch = choicesRef.current;

      if (ph === "playing" && rev == null && /^[1-4]$/.test(e.key)) {
        e.preventDefault();
        const idx = Number(e.key) - 1;
        if (idx < ch.length) pickAnswerRef.current(idx);
        return;
      }
      if (ph === "feedback" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        nextRoundRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const rating =
    phase === "complete" ? getPerformanceRating(score, TOTAL_ROUNDS) : null;

  const shareSummaryText =
    rating != null
      ? `Pokémon Quiz · ${score} 分 · ${TOTAL_ROUNDS} 回合 · ${rating.title}\n${rating.msg}`
      : "";

  const copyFinalScore = useCallback(async () => {
    if (!rating) return;
    const text = `Pokémon Quiz\n本局得分：${score}（${TOTAL_ROUNDS} 回合）\n${rating.title}\n${rating.msg}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyFlash(true);
      window.setTimeout(() => setCopyFlash(false), 2000);
    } catch {
      setA11yMsg("Could not copy to clipboard.");
    }
  }, [rating, score]);

  const shareFinalScore = useCallback(async () => {
    if (!rating || shareSummaryText === "") return;
    if (typeof navigator === "undefined" || !navigator.share) return;
    try {
      await navigator.share({
        title: "Pokémon Quiz",
        text: shareSummaryText,
      });
    } catch (e) {
      if (e?.name === "AbortError") return;
    }
  }, [rating, shareSummaryText]);

  const canWebShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  useEffect(() => {
    if (phase === "feedback" && revealed) {
      const line = formatMultilingual(
        revealed.correctMon.name,
        revealed.correctMon.nameJa,
        revealed.correctMon.nameZh,
      );
      setA11yMsg(
        revealed.correct
          ? `Correct. Plus ${revealed.points} points. ${line}`
          : `Incorrect. Answer: ${line}`,
      );
    } else if (phase === "complete") {
      const r = getPerformanceRating(score, TOTAL_ROUNDS);
      setA11yMsg(`Run finished. ${score} points. ${r.title}. ${r.msg}`);
    }
  }, [phase, revealed, score]);

  const mon = choices[correctIndex];

  const kbdShell = `inline-block rounded px-1 py-px text-[10px] font-mono border ${
    isDark
      ? "border-[#586e75] bg-[#073642] text-[#eee8d5]"
      : "border-[#93a1a1] bg-white text-[#002b36]"
  }`;

  return (
    <div className="container mx-auto px-4 max-w-4xl pb-10">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {a11yMsg}
      </p>
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            {...fadeProps}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            className={panelClass(isDark)}
          >
            <div className="flex items-start gap-3 mb-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg shadow-inner"
                aria-hidden
                style={{
                  background: isDark ? "#073642" : "#eee8d5",
                  boxShadow: isDark
                    ? "inset 0 1px 0 rgba(255,255,255,.06)"
                    : "inset 0 1px 0 rgba(0,0,0,.06)",
                }}
              >
                ⚡
              </span>
              <div className="min-w-0">
                <h3
                  className={`text-lg font-bold tracking-tight ${isDark ? "text-[#fdf6e3]" : "text-[#002b36]"}`}
                >
                  Pokémon Quiz Challenge
                </h3>
                <p
                  className={`text-sm mt-1 leading-relaxed ${isDark ? "text-[#93a1a1]" : "text-[#586e75]"}`}
                >
                  PokéAPI-powered guesses. Options show English, 日本語, and
                  中文 together. Choose your dex range, then answer{" "}
                  {TOTAL_ROUNDS} rounds as fast as you can for speed bonus.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_minmax(220px,280px)] md:items-end">
              <ul
                className={`text-xs sm:text-sm space-y-2 leading-relaxed list-none pl-0 ${
                  isDark ? "text-[#93a1a1]" : "text-[#586e75]"
                }`}
              >
                <li className="flex gap-2">
                  <span className="text-[#268bd2] shrink-0" aria-hidden>
                    ✓
                  </span>
                  <span>
                    <strong
                      className={isDark ? "text-[#eee8d5]" : "text-[#002b36]"}
                    >
                      Score:
                    </strong>{" "}
                    +{BASE_SCORE} per correct answer, up to +
                    {Math.max(...SPEED_THRESHOLDS.map((x) => x[1]))} speed
                    bonus; wrong answers earn +{CONSOLATION_SCORE} consolation.
                  </span>
                </li>
              </ul>
              <div className="flex flex-col gap-2">
                <label
                  className={`text-xs font-semibold ${isDark ? "text-[#eee8d5]" : "text-[#002b36]"}`}
                  htmlFor="pokemon-quiz-generation"
                >
                  Dex range
                </label>
                <select
                  id="pokemon-quiz-generation"
                  value={generationId}
                  onChange={(e) => setGenerationId(e.target.value)}
                  disabled={loading}
                  className={`w-full rounded-xl border-2 px-3 py-2.5 text-sm ${focusRing} transition-shadow ${
                    isDark
                      ? "border-[#586e75] bg-[#002b36] text-[#eee8d5] hover:border-[#657b83]"
                      : "border-[#93a1a1] bg-white/80 text-[#002b36] hover:border-[#586e75]"
                  }`}
                >
                  {GENERATION_OPTIONS.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
                {error && (
                  <p
                    className="text-sm text-red-600 dark:text-red-400 leading-snug rounded-lg bg-red-500/10 px-3 py-2 border border-red-500/20"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
                <button
                  type="button"
                  className={`${btnClass(isDark, true)} w-full`}
                  onClick={startGame}
                  disabled={loading}
                >
                  {loading ? "Loading…" : "Start game"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(phase === "playing" ||
        phase === "feedback" ||
        phase === "loadingRound") && (
        <motion.div key={`play-${round}`} {...fadeProps} className="space-y-3">
          <div
            className={`rounded-2xl border px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 ${
              isDark
                ? "border-[#586e75]/60 bg-[#073642]/40"
                : "border-[#93a1a1]/50 bg-white/50"
            }`}
          >
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs font-medium mb-2 ${isDark ? "text-[#839496]" : "text-[#657b83]"}`}
              >
                Progress
              </p>
              <RoundProgress
                round={round}
                total={TOTAL_ROUNDS}
                isDark={isDark}
              />
            </div>
            <div
              className={`shrink-0 text-right sm:text-left sm:pl-4 sm:border-l ${
                isDark ? "sm:border-[#586e75]/50" : "sm:border-[#93a1a1]/50"
              }`}
            >
              <p
                className={`text-xs font-medium ${isDark ? "text-[#839496]" : "text-[#657b83]"}`}
              >
                Score
              </p>
              <p
                className={`text-2xl font-bold tabular-nums ${isDark ? "text-[#eee8d5]" : "text-[#002b36]"}`}
              >
                {score}
              </p>
            </div>
          </div>

          <div className={panelClass(isDark)}>
            {phase === "loadingRound" ? (
              <QuizSkeleton isDark={isDark} reduceMotion={reduceMotion} />
            ) : mon ? (
            <>
            <div className="grid grid-cols-[minmax(88px,112px)_1fr] sm:grid-cols-[minmax(104px,128px)_1fr] gap-4">
              <div>
                <SectionLabel isDark={isDark}>Sprite</SectionLabel>
                <div
                  className={`rounded-2xl p-3 flex items-center justify-center aspect-square max-h-[128px] ${
                    isDark
                      ? "bg-gradient-to-b from-[#073642] to-[#002b36] ring-1 ring-white/5"
                      : "bg-gradient-to-b from-white to-[#e8e4d9] ring-1 ring-[#002b36]/5 shadow-inner"
                  }`}
                >
                  {mon.spriteUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mon.spriteUrl}
                      alt="Mystery Pokémon sprite"
                      width={112}
                      height={112}
                      className="w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] object-contain [image-rendering:pixelated] drop-shadow-sm"
                    />
                  ) : (
                    <span className="text-xs opacity-60">No sprite</span>
                  )}
                </div>
              </div>
              <div className="min-w-0 space-y-3">
                <div>
                  <SectionLabel isDark={isDark}>Types</SectionLabel>
                  <p className="text-sm leading-snug break-words">
                    {typesLine(mon.types)}
                  </p>
                </div>
                <div
                  className={`text-sm leading-relaxed ${isDark ? "text-[#93a1a1]" : "text-[#586e75]"}`}
                >
                  <span
                    className={isDark ? "text-[#657b83]" : "text-[#93a1a1]"}
                  >
                    Size
                  </span>{" "}
                  <strong
                    className={isDark ? "text-[#eee8d5]" : "text-[#002b36]"}
                  >
                    {mon.height / 10} m
                  </strong>
                  {" · "}
                  <strong
                    className={isDark ? "text-[#eee8d5]" : "text-[#002b36]"}
                  >
                    {mon.weight / 10} kg
                  </strong>
                  <br />
                  <span
                    className={isDark ? "text-[#657b83]" : "text-[#93a1a1]"}
                  >
                    Abilities
                  </span>{" "}
                  {mon.abilities.map((a) => titleCaseName(a)).join(", ")}
                </div>
                <div>
                  <SectionLabel isDark={isDark}>Base stats</SectionLabel>
                  <div className="grid grid-cols-2 gap-3">
                    {STAT_ROWS.map(([statKey, max, color]) => (
                      <StatMeter
                        key={statKey}
                        label={statKey}
                        value={mon.stats[statKey] ?? 0}
                        max={max}
                        color={color}
                        isDark={isDark}
                        reduceMotion={reduceMotion}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mt-5 pt-5 border-t ${isDark ? "border-[#586e75]/50" : "border-[#93a1a1]/50"}`}
            >
              <SectionLabel isDark={isDark}>Choose the Pokémon</SectionLabel>
              <p
                className={`text-[11px] mb-2.5 leading-snug ${isDark ? "text-[#657b83]" : "text-[#93a1a1]"}`}
              >
                Keys <kbd className={kbdShell}>1</kbd>–
                <kbd className={kbdShell}>4</kbd> to select ·{" "}
                <kbd className={kbdShell}>Enter</kbd> or{" "}
                <kbd className={kbdShell}>Space</kbd> after feedback to continue
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {choices.map((c, i) => {
                  const wrongPick =
                    phase === "feedback" &&
                    revealed &&
                    !revealed.correct &&
                    revealed.pickedIndex === i;
                  const showCorrect =
                    phase === "feedback" && revealed && i === correctIndex;
                  return (
                    <motion.button
                      key={`${c.name}-${i}`}
                      type="button"
                      disabled={phase === "feedback"}
                      onClick={() => pickAnswer(i)}
                      whileTap={
                        reduceMotion || phase === "feedback"
                          ? undefined
                          : { scale: 0.98 }
                      }
                      className={`text-left rounded-xl border-2 px-3 py-3 min-h-[4rem] transition-colors duration-200 ${focusRing} ${
                        showCorrect
                          ? isDark
                            ? "border-emerald-500/90 bg-emerald-950/35 shadow-[0_0_0_1px_rgba(52,211,153,0.25)]"
                            : "border-emerald-600 bg-emerald-50 shadow-sm"
                          : wrongPick
                            ? isDark
                              ? "border-red-500/80 bg-red-950/30"
                              : "border-red-400 bg-red-50"
                            : isDark
                              ? "border-[#586e75] bg-[#002b36]/60 hover:border-[#268bd2] hover:bg-[#073642]/80 shadow-sm"
                              : "border-[#93a1a1] bg-white/70 hover:border-[#2075c7] hover:bg-white shadow-sm"
                      } ${phase === "feedback" ? "cursor-default" : "cursor-pointer"}`}
                      aria-label={`Option ${i + 1}: ${titleCaseName(c.name)}`}
                    >
                      <span className="font-mono text-[11px] opacity-60 mr-1.5">
                        {i + 1}.
                      </span>
                      <span
                        className={`font-semibold text-sm ${isDark ? "text-[#fdf6e3]" : "text-[#002b36]"}`}
                      >
                        {titleCaseName(c.name)}
                      </span>
                      <span
                        className={`block text-xs mt-1 pl-5 leading-snug ${isDark ? "text-[#93a1a1]" : "text-[#586e75]"}`}
                      >
                        {c.nameJa} · {c.nameZh}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {phase === "feedback" && revealed && (
                  <motion.div
                    key="feedback"
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`mt-5 pt-5 border-t ${isDark ? "border-[#586e75]/50" : "border-[#93a1a1]/50"}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                      <div className="text-sm min-w-0 space-y-2">
                        {revealed.correct ? (
                          <>
                            <p
                              className={`font-bold text-base ${isDark ? "text-[#2aa198]" : "text-[#2075c7]"}`}
                            >
                              Nice! +{revealed.points} points
                            </p>
                            <p
                              className={
                                isDark ? "text-[#93a1a1]" : "text-[#586e75]"
                              }
                            >
                              Base +{BASE_SCORE}, speed +{revealed.bonus} ·{" "}
                              <span className="font-medium">
                                {revealed.speedLabel}
                              </span>{" "}
                              · {revealed.seconds.toFixed(1)}s
                            </p>
                            <p className="text-xs opacity-90 truncate">
                              {formatMultilingual(
                                revealed.correctMon.name,
                                revealed.correctMon.nameJa,
                                revealed.correctMon.nameZh,
                              )}
                            </p>
                          </>
                        ) : (
                          <>
                            <p
                              className={`font-bold text-base ${isDark ? "text-[#cb4b16]" : "text-[#cb4b16]"}`}
                            >
                              Not quite · +{CONSOLATION_SCORE} consolation
                            </p>
                            <p className="text-xs sm:text-sm">
                              <span
                                className={
                                  isDark ? "text-[#657b83]" : "text-[#93a1a1]"
                                }
                              >
                                Answer:{" "}
                              </span>
                              {formatMultilingual(
                                revealed.correctMon.name,
                                revealed.correctMon.nameJa,
                                revealed.correctMon.nameZh,
                              )}
                            </p>
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        className={`${btnClass(isDark, true)} shrink-0 w-full sm:w-auto min-w-[8rem]`}
                        onClick={nextRound}
                      >
                        {round >= TOTAL_ROUNDS ? "View results" : "Next round"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </>
            ) : null}
          </div>
        </motion.div>
      )}

      {phase === "complete" && rating && (
        <motion.div
          key="complete"
          {...fadeProps}
          className={panelClass(isDark)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl ${
                isDark
                  ? "bg-[#073642] shadow-inner"
                  : "bg-[#eee8d5] shadow-inner"
              }`}
              aria-hidden
            >
              🏆
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`text-xl font-bold tracking-tight ${isDark ? "text-[#fdf6e3]" : "text-[#002b36]"}`}
              >
                Run complete
              </h3>
              <p className="text-lg font-semibold mt-1 tabular-nums">
                <span className={isDark ? "text-[#eee8d5]" : "text-[#002b36]"}>
                  {score}
                </span>
                <span
                  className={`text-sm font-normal ml-2 ${isDark ? "text-[#93a1a1]" : "text-[#586e75]"}`}
                >
                  points · {(score / TOTAL_ROUNDS).toFixed(1)} avg / round
                </span>
              </p>
              <p
                className={`text-base font-bold mt-2 ${isDark ? "text-[#2aa198]" : "text-[#2075c7]"}`}
              >
                {rating.title}
              </p>
              <p
                className={`text-sm mt-1 leading-relaxed ${isDark ? "text-[#93a1a1]" : "text-[#586e75]"}`}
              >
                {rating.msg}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:min-w-[10rem]">
              <button
                type="button"
                className={btnClass(isDark, false)}
                onClick={copyFinalScore}
              >
                {copyFlash ? "已复制" : "复制本局分数"}
              </button>
              {canWebShare && (
                <button
                  type="button"
                  className={btnClass(isDark, false)}
                  onClick={shareFinalScore}
                >
                  分享本局结果
                </button>
              )}
              <button
                type="button"
                className={btnClass(isDark, true)}
                onClick={startGame}
              >
                Play again
              </button>
              <Link
                href="https://github.com/Rickyoung221/Pokemon-guest-quiz"
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnClass(isDark, false)} text-center`}
              >
                CLI version
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      <p
        className={`mt-6 text-center text-[11px] leading-relaxed max-w-2xl mx-auto ${
          isDark ? "text-[#657b83]" : "text-[#93a1a1]"
        }`}
      >
        Unofficial fan project. Names and Pokédex data are from{" "}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
          className={`underline underline-offset-2 ${
            isDark
              ? "text-[#93a1a1] hover:text-[#eee8d5]"
              : "text-[#586e75] hover:text-[#002b36]"
          }`}
        >
          PokéAPI
        </a>
        . Not affiliated with The Pokémon Company.
      </p>
    </div>
  );
}
