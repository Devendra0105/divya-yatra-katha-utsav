import { useMemo } from "react";
import { ArrowUpRight, ImageOff, MapPinned } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { destinations, type Destination } from "@/data/destinations";

type Scene = { destination: Destination; no: number; hero: boolean };
type Chapter = { region: string; scenes: Scene[] };

// Presentation-only focal points so the portrait/square crops keep each landmark in frame.
const focalPoint: Record<string, string> = {
  "konark-sun-temple": "72% 50%",
  "lingaraj-temple": "80% 50%",
  "howrah-bridge": "80% 50%",
  "chandrabhaga-beach": "28% 50%",
  gangasagar: "35% 50%",
  "swaminarayan-temple-kolkata": "50% 65%",
};

const toDevanagari = (value: number) =>
  String(value)
    .padStart(2, "0")
    .replace(/\d/g, (digit) => "०१२३४५६७८९"[Number(digit)] ?? digit);

const sceneRange = (chapter: Chapter) => {
  const first = chapter.scenes[0]?.no ?? 1;
  const last = chapter.scenes[chapter.scenes.length - 1]?.no ?? first;
  return first === last ? toDevanagari(first) : `${toDevanagari(first)} – ${toDevanagari(last)}`;
};

/** Groups the existing destination list by its own `region` field, in first-appearance order. */
function buildChapters(items: readonly Destination[]): Chapter[] {
  const chapters = new Map<string, Chapter>();
  items.forEach((destination, index) => {
    const chapter = chapters.get(destination.region) ?? { region: destination.region, scenes: [] };
    chapter.scenes.push({ destination, no: index + 1, hero: chapter.scenes.length === 0 });
    chapters.set(destination.region, chapter);
  });
  return [...chapters.values()];
}

export function DestinationExplorer() {
  const chapters = useMemo(() => buildChapters(destinations), []);

  return (
    <div className="temple-band">
      {chapters.map((chapter) => (
        <section key={chapter.region} aria-label={chapter.region}>
          <div className="chapter-head" data-reveal="up">
            <p className="chapter-no">{sceneRange(chapter)}</p>
            <h3 className="chapter-title">{chapter.region}</h3>
            <p className="chapter-count">{chapter.scenes.length} दर्शन स्थल</p>
            <span className="chapter-rule" aria-hidden="true" />
          </div>
          {chapter.scenes.map((scene) => (
            <DestinationScene key={scene.destination.id} scene={scene} />
          ))}
        </section>
      ))}
    </div>
  );
}

function DestinationScene({ scene }: { scene: Scene }) {
  const { destination, no, hero } = scene;
  return (
    <Dialog>
      <div className="scene-wrap">
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`${destination.title} का विवरण खोलें`}
            className={`scene ${hero ? "scene--tall" : "scene--square"}`}
          >
            <span className="scene__media">
              {destination.image ? (
                <img
                  src={destination.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="scene__img"
                  style={{ objectPosition: focalPoint[destination.id] ?? "50% 50%" }}
                />
              ) : (
                <span className="scene__fallback" />
              )}
            </span>
            <span className="scene__shade" aria-hidden="true" />
            <span className="scene__text">
              <span className="scene__no">{toDevanagari(no)}</span>
              <span className="scene__title">{destination.title}</span>
              <span className="scene__meta">{destination.location}</span>
              <span className="scene__cta">
                दर्शन विवरण <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </span>
          </button>
        </DialogTrigger>
      </div>
      <DestinationDialog destination={destination} />
    </Dialog>
  );
}

function DestinationImage({ destination, className = "" }: { destination: Destination; className?: string }) {
  if (destination.image) {
    return (
      <img
        src={destination.image}
        alt={destination.title}
        loading="lazy"
        decoding="async"
        className={`block w-full object-cover ${className}`}
      />
    );
  }

  return (
    <span
      className={`relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden bg-muted text-muted-foreground ${className}`}
      role="img"
      aria-label={`${destination.title} का फोटो उपलब्ध नहीं है`}
    >
      <img
        src="/background.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        loading="lazy"
        decoding="async"
      />
      <ImageOff aria-hidden="true" className="relative size-7" />
      <span className="relative text-xs">फोटो उपलब्ध होने पर जोड़ा जाएगा</span>
    </span>
  );
}

function DestinationDialog({ destination }: { destination: Destination }) {
  const related = destinations
    .filter((item) => item.id !== destination.id && item.region === destination.region && item.image)
    .slice(0, 3);
  const otherTravelViews = related.length
    ? related
    : destinations.filter((item) => item.id !== destination.id && item.image).slice(0, 3);
  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination.englishName)}`;

  return (
    <DialogContent className="max-h-[90svh] w-[calc(100vw-1.5rem)] max-w-[26rem] gap-0 overflow-y-auto rounded-sm border-secondary p-0">
      <div className="bg-muted">
        <DestinationImage destination={destination} className="h-full min-h-52 object-cover" />
      </div>
      <div className="p-5">
        <DialogHeader className="text-left">
          <p className="text-sm text-primary">{destination.location}</p>
          <DialogTitle className="font-display text-2xl font-normal leading-[1.5] tracking-normal">
            {destination.title}
          </DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-7">
            {destination.verifiedNote ??
              "यह स्थल यात्रा-विवरणिका की दर्शन-सूची में शामिल है। इसके बारे में अतिरिक्त ऐतिहासिक विवरण उपलब्ध नहीं कराया गया है।"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 border-y border-border py-4">
          <p className="text-xs text-muted-foreground">स्थान</p>
          <p className="mt-1 text-sm text-foreground">{destination.location}</p>
        </div>

        <Button asChild className="mt-5 h-auto min-h-12 w-full whitespace-normal py-2">
          <a href={mapUrl} target="_blank" rel="noreferrer">
            <MapPinned aria-hidden="true" />
            Google Maps पर मार्ग
          </a>
        </Button>

        <div className="mt-7">
          <h3 className="text-lg leading-[1.5] text-foreground">यात्रा के अन्य दर्शन</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {otherTravelViews.map((item) => (
              <figure key={item.id} className="min-w-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <figcaption className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
