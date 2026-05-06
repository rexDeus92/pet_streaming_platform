import Image from "next/image";
import Link from "next/link";
import { moviesData } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const content = moviesData.find((item) => item.id === id);

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background blur/gradient */}
      <div className="fixed inset-0 bg-[#0F0F11] -z-10" />
      <div className="fixed top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-primary/5 to-transparent -z-10" />

      <div className="container flex flex-col lg:flex-row gap-12">
        {/* Left Column: Poster & Actions */}
        <div className="w-full lg:w-72 flex-shrink-0 space-y-6">
          <div className="aspect-[2/3] w-full rounded-xl overflow-hidden bg-[#1A1A1D] border border-white/5 shadow-2xl">
            {/* Placeholder for movie poster */}
            <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold uppercase tracking-widest text-center px-4">
              {content.name}
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Буду смотреть
            </button>
            <div className="flex gap-2">
              <button className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-lg font-semibold transition-colors">
                Трейлер
              </button>
              <button className="bg-white/5 hover:bg-white/10 px-4 rounded-lg transition-colors">
                ...
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Поделиться</h4>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer text-xs">
                  {/* Social icons placeholders */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Main Info */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-2">{content.name} ({content.type === "сериал" ? "сериал " : ""}{content.year} – ...)</h1>
            <div className="flex items-center gap-4 text-gray-400 font-medium">
              <span>{content.id.replace(/-/g, ' ').toUpperCase()}</span>
              <span className="border border-white/20 px-2 py-0.5 rounded text-xs">18+</span>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              {content.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">О {content.type === "сериал" ? "сериале" : "фильме"}</h2>
              <dl className="grid grid-cols-[140px_1fr] gap-y-4 text-sm">
                <dt className="text-gray-500">Год производства</dt>
                <dd>{content.year}</dd>

                <dt className="text-gray-500">Платформа</dt>
                <dd className="text-primary hover:underline cursor-pointer">{content.platform}</dd>

                <dt className="text-gray-500">Страна</dt>
                <dd>{content.country}</dd>

                <dt className="text-gray-500">Жанр</dt>
                <dd>{content.genre}</dd>

                <dt className="text-gray-500">Слоган</dt>
                <dd className="italic text-gray-400">«{content.slogan}»</dd>

                <dt className="text-gray-500">Режиссер</dt>
                <dd className="text-primary hover:underline cursor-pointer">{content.director}</dd>

                <dt className="text-gray-500">Сценарий</dt>
                <dd>{content.scenario}</dd>
              </dl>
            </div>

            {/* Right Column: Actors (Sidebar in Kinopoisk style) */}
            <div className="w-full space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                  В главных ролях
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </h3>
                <ul className="space-y-3 text-sm">
                  {content.starring.map((actor) => (
                    <li key={actor} className="text-gray-300 hover:text-primary transition-colors cursor-pointer">
                      {actor}
                    </li>
                  ))}
                  <li className="text-primary hover:underline cursor-pointer pt-2">все актеры</li>
                </ul>
              </div>

              <div className="bg-[#1A1A1D] p-6 rounded-2xl border border-white/5 text-center">
                <div className="text-4xl font-black text-primary mb-1">{content.rating}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Рейтинг LUMINA</div>
                <button className="w-full bg-white/5 hover:bg-white/10 py-2 rounded-lg text-sm font-bold transition-colors">
                  Оценить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
