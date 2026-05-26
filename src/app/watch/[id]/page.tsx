import { moviesData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

// Карта трейлеров YouTube для демонстрации
const trailerMap: Record<string, string> = {
  "interstellar": "zSWdZAIBEs4",
  "the-boys": "M1bhOaLv4FU",
  "dark-knight": "LDG9bisJEaI",
  "inception": "YoHD9XEInc0",
  "breaking-bad": "HhesaQXLuRY",
  "pulp-fiction": "s7EdQ4FqbhY",
  "fight-club": "O1fZgAp55aU",
  "sherlock": "IrBKwzL3K1g",
  "arcane": "fXmAurh012s",
  "green-mile": "Ki4haFrqSUw",
  "gladiator": "P5ieIbInFpg",
  "forrest-gump": "bLvqoHBptjg",
  "matrix": "vKQi3bBA1y8",
  "stranger-things": "b9EkMc79ZSU",
  "chernobyl": "s9APLXM9Ei8",
  "parasite": "5xH0HfJHsaY",
  "lion-king": "lFzVJEksoDY",
  "better-call-saul": "HN4oydykJFc",
  "godfather": "UaVTIH8MujA",
  "spirited-away": "ByXuk9QqQkk",
  "joker": "zAGVQLHvwOY",
  "dune": "n9DwoQ7HWvI",
  "spider-verse": "g4Hbz2jWDdM",
  "prestige": "o4gHCmTQDxs",
  "whiplash": "7d_jQyG83qI",
  "blade-runner-2049": "gCcx85zbxz4",
  "succession": "OzYxJV_JH3U",
  "ted-lasso": "3u7EIiohsTE"
};

function getVideoSrc(url: string, id: string): { type: "youtube" | "video" | "iframe"; src: string } {
  if (!url) {
    const ytId = trailerMap[id] || "zSWdZAIBEs4";
    return { type: "youtube", src: `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0` };
  }

  // Поддержка Google Drive
  if (url.includes("drive.google.com")) {
    let embedUrl = url;
    if (url.includes("/view")) {
      embedUrl = url.replace(/\/view.*/, "/preview");
    } else if (!url.includes("/preview")) {
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        embedUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return { type: "iframe", src: embedUrl };
  }

  // Прямая ссылка на MP4
  if (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")) {
    return { type: "video", src: url };
  }

  return { type: "iframe", src: url };
}

export async function generateStaticParams() {
  return moviesData.map((movie) => ({
    id: movie.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params;
  const content = moviesData.find((item) => item.id === id);

  if (!content) {
    notFound();
  }

  const video = getVideoSrc(content.url, content.id);

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col">
      {/* Шапка плеера */}
      <header className="absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-black/80 to-transparent py-6 px-6 md:px-12 flex items-center gap-6">
        <Link
          href={`/movie/${content.id}`}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <span className="text-xs text-primary font-bold uppercase tracking-widest">Просмотр</span>
          <h1 className="text-lg md:text-xl font-bold">{content.name}</h1>
        </div>
      </header>

      {/* Контейнер плеера */}
      <div className="flex-1 w-full h-full flex items-center justify-center relative aspect-video md:aspect-auto bg-[#070708]">
        {/* Skeleton Загрузчик */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
        </div>

        {video.type === "youtube" && (
          <iframe
            src={video.src}
            className="w-full h-full absolute inset-0 border-0 z-10 bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}

        {video.type === "iframe" && (
          <iframe
            src={video.src}
            className="w-full h-full absolute inset-0 border-0 z-10 bg-black"
            allow="autoplay"
            allowFullScreen
          />
        )}

        {video.type === "video" && (
          <video
            src={video.src}
            className="w-full h-full max-h-screen object-contain z-10 bg-black"
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
}
