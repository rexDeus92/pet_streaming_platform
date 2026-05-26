"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { moviesData, Content } from "@/lib/data";

const STORAGE_KEY = "lumina_watchlist";

function getWatchlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function MyListPage() {
  const [items, setItems] = useState<Content[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const ids = getWatchlist();
    const saved = moviesData.filter((m) => ids.includes(m.id));
    setItems(saved);
    setLoaded(true);
  }, []);

  const remove = (id: string) => {
    const list = getWatchlist().filter((i) => i !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setItems((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#0F0F11]">
      <div className="container">
        {/* Заголовок */}
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">Мой список</h1>
          <p className="text-gray-400">
            {loaded ? `${items.length} ${items.length === 1 ? "элемент" : items.length >= 2 && items.length <= 4 ? "элемента" : "элементов"} сохранено` : "Загрузка..."}
          </p>
        </div>

        {/* Контент */}
        {!loaded ? (
          // Скелетон загрузки
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] rounded-xl bg-[#1A1A1D] mb-3" />
                <div className="h-4 bg-[#1A1A1D] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[#1A1A1D] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group relative">
                {/* Кнопка удаления */}
                <button
                  onClick={() => remove(item.id)}
                  title="Убрать из списка"
                  className="absolute top-2 right-2 z-40 w-7 h-7 rounded-full bg-black/70 border border-white/10 text-gray-400 hover:text-white hover:bg-red-500/80 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <Link href={`/movie/${item.id}`} className="block cursor-pointer">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#1A1A1D] mb-3 border border-white/5 transition-all duration-300">
                    {/* Рейтинг */}
                    <div className="absolute top-2 left-2 z-30 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-primary border border-white/10 shadow-lg">
                      {item.rating}
                    </div>

                    {/* Оверлей при hover */}
                    <div className="absolute inset-0 group-hover:bg-black/50 transition-colors duration-300 z-10" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/20 scale-90 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {item.year} • {item.genre.split(",")[0]}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          // Пустое состояние
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 rounded-full bg-[#1A1A1D] border border-white/5 flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Список пуст</h2>
            <p className="text-gray-400 mb-8 max-w-sm">
              Добавляйте фильмы и сериалы в список кнопкой «Буду смотреть» на странице контента.
            </p>
            <Link
              href="/"
              className="bg-primary hover:bg-primary-hover text-black px-8 py-3 rounded-full font-bold transition-colors"
            >
              Перейти на главную
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
