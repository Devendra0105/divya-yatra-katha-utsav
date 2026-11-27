import { useEffect, useRef, useState } from "react";
import { Flower2, Sparkles } from "lucide-react";

import jagannathArtwork from "@/assets/divya-yatra/jagannath-artwork.jpg.asset.jpeg";
import { AksharHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { katha } from "@/data/katha";
import { cssVars } from "@/lib/utils";

type Spark = { left: number; size: number; duration: number; delay: number; drift: number };

// Fixed values (no Math.random): the cover is server-rendered and must hydrate identically.
const SPARKS: readonly Spark[] = [
  { left: 6, size: 3, duration: 11, delay: 2, drift: 14 },
  { left: 14, size: 4, duration: 14, delay: 7, drift: -18 },
  { left: 22, size: 3, duration: 12, delay: 4, drift: 10 },
  { left: 31, size: 5, duration: 16, delay: 9, drift: -12 },
  { left: 39, size: 3, duration: 13, delay: 1, drift: 20 },
  { left: 47, size: 4, duration: 15, delay: 6, drift: -8 },
  { left: 55, size: 3, duration: 11, delay: 10, drift: 16 },
  { left: 63, size: 5, duration: 17, delay: 3, drift: -20 },
  { left: 71, size: 3, duration: 12, delay: 8, drift: 12 },
  { left: 79, size: 4, duration: 14, delay: 5, drift: -14 },
  { left: 86, size: 3, duration: 13, delay: 11, drift: 18 },
  { left: 93, size: 4, duration: 16, delay: 0, drift: -10 },
];

const stagger = (ms: number) => cssVars({ "--d": `${ms}ms` });

// Timeline (ms after tap): flap + card 0-900, bloom wipe 650-1500. Skipped for reduced motion.
const BLOOM_AT = 650;
const OPENED_AT = 1450;

export function InvitationCover({
  guestName,
  onOpened,
}: {
  guestName: string | undefined;
  onOpened: () => void;
}) {
  const [phase, setPhase] = useState<"idle" | "opening" | "bloom">("idle");
  const [origin, setOrigin] = useState<{ x: number; y: number } | undefined>(undefined);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // Warm the ornament bands used by the page behind the cover, so they don't pop in after opening.
  useEffect(() => {
    for (const src of ["/bg-top.jpg", "/bg-bottom.jpg"]) {
      const image = new Image();
      image.src = src;
    }
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const open = () => {
    if (phase !== "idle") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = envelopeRef.current?.getBoundingClientRect();
    if (rect) setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.56 });
    setPhase("opening");
    timers.current.push(
      window.setTimeout(() => setPhase("bloom"), reduceMotion ? 0 : BLOOM_AT),
      window.setTimeout(onOpened, reduceMotion ? 0 : OPENED_AT),
    );
  };

  const isOpen = phase !== "idle";
  const bloomStyle = origin ? cssVars({ "--bx": `${origin.x}px`, "--by": `${origin.y}px` }) : undefined;

  return (
    <div className="phone-shell invitation-cover">
      <div className="cover-glow" aria-hidden="true" />
      <div className="cover-vignette" aria-hidden="true" />
      <div className="cover-sparks" aria-hidden="true">
        {SPARKS.map((spark) => (
          <span
            key={spark.left}
            className="spark"
            style={{
              ...cssVars({ "--drift": `${spark.drift}px` }),
              left: `${spark.left}%`,
              width: spark.size,
              height: spark.size,
              animationDuration: `${spark.duration}s`,
              animationDelay: `-${spark.delay}s`,
            }}
          />
        ))}
      </div>

      <main className="relative flex min-h-svh flex-col items-center justify-center px-7 py-[max(6svh,2rem)] text-center">
        <div className="rise" style={stagger(40)}>
          <AksharHeader />
        </div>

        <p className="rise text-sm text-primary" style={stagger(120)}>
          {katha.organizers}
        </p>

        <div className="rise mt-5" style={stagger(240)}>
          <div className="env-float">
            {/* Decorative: the button below is the accessible control; tapping the envelope is a convenience. */}
            <div
              ref={envelopeRef}
              className="env"
              data-open={isOpen}
              aria-hidden="true"
              onClick={open}
            >
              <div className="env__back" />
              <div className="env__card">
                <img src={jagannathArtwork} alt="" decoding="async" />
              </div>
              <div className="env__pocket" />
              <div className="env__flap" />
              <div className={`env__seal ${isOpen ? "" : "pulse-ring"}`}>
                <Flower2 className="size-6" strokeWidth={1.6} />
              </div>
            </div>
          </div>
        </div>

        <div className="rise mt-6" style={stagger(460)}>
          <h1 className="sheen-text text-[1.75rem] leading-[1.5]">{katha.title}</h1>
        </div>
        <p className="rise mt-1 font-display text-xl leading-[1.5] text-foreground" style={stagger(640)}>
          {guestName ? `आदरणीय ${guestName} जी` : "आप सादर आमंत्रित हैं"}
        </p>
        <p className="rise mt-1 text-sm leading-6 text-foreground/85" style={stagger(740)}>
          {katha.location}
        </p>
        <p className="rise text-sm text-muted-foreground" style={stagger(820)}>
          {katha.startDate} से {katha.endDate}
        </p>

        <div className="rise flex flex-col items-center" style={stagger(940)}>
          <Button className="btn-royal mt-5 min-h-12 px-8" disabled={isOpen} onClick={open} size="lg">
            <Sparkles aria-hidden="true" />
            निमंत्रण खोलें
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">शुभारंभ हेतु स्पर्श करें</p>
        </div>
      </main>

      {phase === "bloom" ? (
        <>
          <div className="bloom-layer" style={bloomStyle} aria-hidden="true" />
          <div className="bloom-flash" style={bloomStyle} aria-hidden="true" />
        </>
      ) : null}
    </div>
  );
}
