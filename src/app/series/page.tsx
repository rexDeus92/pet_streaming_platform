"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { moviesData, Content } from "@/lib/data";
import GradientPoster from "@/components/GradientPoster";

export default function SeriesPage() {
  const [selectedGenre, setSelectedGenre] = useState("все");
  const [selectedYear, setSelectedYear] = useState("все");
  const [sortBy, setSortBy] = useState("rating"); // "rating" | "year"

  // Фильтруем данные только для сериалов
  const series = useMemo(() => {
    return moviesData.filter((item) => item.type === "сериал");
  }, []);

  // Получаем уникальные жанры динамически
  const genres = useMemo(() => {
    const set = new Set<string>();
    series.forEach((item) => {
      item.genre.split(",").forEach((g) => set.add(g.trim().toLowerCase()));
    });
    return ["все", ...Array.from(set)];
  }, [series]);

  // Получаем уникальные года динамически (сортировка по убыванию)
  const years = useMemo(() => {
    const set = new Set<string>();
    series.forEach((item) => set.add(item.year));
    return ["все", ...Array.from(set).sort((a, b) => b.localeCompare(a))];
  }, [series]);

  // Фильтрация и сортировка контента
  const filteredSeries = useMemo(() => {
    let result = [...series];

    if (selectedGenre !== "все") {
      result = result.filter((item) =>
        item.genre.toLowerCase().includes(selectedGenre)
      );
    }

    if (selectedYear !== "все") {
      result = result.filter((item) => item.year === selectedYear);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "year") {
      result.sort((a, b) => b.year.localeCompare(a.year));
    }

    return result;
  }, [series, selectedGenre, selectedYear, sortBy]);

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#0F0F11]">
      <div className="container">
        {/* Заголовок страницы */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">Сериалы</h1>
          <p className="text-gray-400">Найдено сериалов: {filteredSeries.length}</p>
        </div>

        {/* Панель фильтров */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10 bg-[#131316] p-6 rounded-2xl border border-white/5 shadow-xl">
          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
            {/* Выбор Жанра */}
            <div className="flex flex-col gap-1 w-full sm:w-48">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Жанр</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-[#1A1A1D] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g === "все" ? "Все жанры" : g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Выбор Года */}
            <div className="flex flex-col gap-1 w-full sm:w-40">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Год</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-[#1A1A1D] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y === "все" ? "Все года" : y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Сортировка */}
          <div className="flex flex-col gap-1 w-full md:w-auto sm:w-48">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Сортировка</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1A1A1D] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="rating">По рейтингу</option>
              <option value="year">По новизне</option>
            </select>
          </div>
        </div>

        {/* Сетка сериалов */}
        {filteredSeries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredSeries.map((item) => (
              <Link key={item.id} href={`/movie/${item.id}`} className="group cursor-pointer block">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#1A1A1D] mb-3 border border-white/5 transition-all duration-300">
                  {/* Rating Badge */}
                  <div className="absolute top-2 left-2 z-30 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-primary border border-white/10 shadow-lg">
                    {item.rating}
                  </div>

                  {item.cover ? (
                    <img src={item.cover} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <GradientPoster title={item.name} className="w-full h-full" />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 group-hover:bg-card-hover transition-colors duration-300 z-10" />
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
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 bg-[#131316] rounded-2xl border border-white/5 p-8">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl font-bold text-white mb-2">Сериалы не найдены</p>
            <p className="text-sm">Попробуйте изменить выбранные параметры фильтрации.</p>
          </div>
        )}
      </div>
    </main>
  );
}
