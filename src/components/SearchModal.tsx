"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { moviesData, Content } from "@/lib/data";
import GradientPoster from "@/components/GradientPoster";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Content[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Фокусируемся на инпуте при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Закрытие по нажатию Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Поиск при изменении ввода
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = moviesData.filter((item) => {
      const q = query.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.genre.toLowerCase().includes(q) ||
        item.director.toLowerCase().includes(q) ||
        item.starring.some((actor) => actor.toLowerCase().includes(q))
      );
    });

    setResults(filtered.slice(0, 8)); // Ограничиваем количество результатов для быстрой отрисовки
    setSelectedIndex(-1); // Сбрасываем выбор при новом поиске
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        router.push(`/movie/${results[selectedIndex].id}`);
        onClose();
      } else if (results.length > 0) {
        router.push(`/movie/${results[0].id}`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 bg-black/50 backdrop-blur-sm cursor-pointer transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      {/* Само окно поиска — непрозрачное, клик внутри не закрывает окно */}
      <div
        className="relative w-full max-w-2xl bg-[#131316] border border-white/10 rounded-xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[70vh] cursor-default animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Поле ввода */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10">
          <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Фильмы, сериалы, жанры, актеры..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-white placeholder-gray-500 text-lg focus:outline-none border-none outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/5 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Результаты поиска */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6">
          {query.trim() === "" ? (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Популярные запросы</h3>
              <div className="flex flex-wrap gap-2">
                {["Интерстеллар", "Пацаны", "Дюна", "Аркейн", "Шерлок"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 hover:text-primary rounded-full text-sm font-semibold transition-colors border border-white/5 cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Результаты поиска ({results.length})</h3>
              <div className="space-y-2">
                {results.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/movie/${item.id}`}
                    onClick={onClose}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group cursor-pointer border ${
                      selectedIndex === index 
                        ? "bg-white/10 border-white/20" 
                        : "hover:bg-white/5 border-transparent hover:border-white/5"
                    }`}
                  >
                    {/* Миниатюра */}
                    <div className="w-12 h-16 rounded bg-[#1A1A1D] border border-white/5 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      {item.cover ? (
                        <img src={item.cover} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <GradientPoster title={item.name} className="w-full h-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-400 truncate">
                        {item.year} • {item.genre}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                      <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="text-xs font-bold text-primary">{item.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg">Ничего не найдено</p>
              <p className="text-sm text-gray-600 mt-1">Попробуйте ввести другое название или жанр</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
