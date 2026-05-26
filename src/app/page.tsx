"use client";

import Image from "next/image";
import Link from "next/link";
import { moviesData, Content } from "@/lib/data";
import GradientPoster from "@/components/GradientPoster";

export default function Home() {
  // Находим контент с наивысшим рейтингом для Hero секции
  const heroContent = [...moviesData].sort((a, b) => b.rating - a.rating)[0];
  
  // Фильтруем данные для секций
  const popularContent = moviesData.slice(0, 15);
  const newContent = moviesData.filter(item => parseInt(item.year) >= 2020).slice(0, 15);
  const seriesContent = moviesData.filter(item => item.type === "сериал").slice(0, 15);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center overflow-hidden">
        {heroContent.cover ? (
          <img src={heroContent.cover} alt={heroContent.name} className="absolute inset-0 w-full h-full object-cover z-0" />
        ) : (
          <GradientPoster title={heroContent.name} className="absolute inset-0 w-full h-full z-0 opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F11] via-[#0F0F11]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10" />
        
        <div className="container relative z-20 w-full h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{heroContent.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="text-primary font-bold">{heroContent.rating}</span>
              <span>{heroContent.year}</span>
              <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">18+</span>
            </div>
            <p className="text-lg text-gray-300 mb-8 line-clamp-3">
              {heroContent.description}
            </p>
            <div className="flex gap-4">
              <Link href={`/watch/${heroContent.id}`} className="bg-primary hover:bg-primary-hover text-black px-8 py-3 rounded-full font-bold transition-colors cursor-pointer">
                Смотреть
              </Link>
              <Link href={`/movie/${heroContent.id}`} className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-3 rounded-full font-bold transition-colors cursor-pointer">
                О фильме
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container py-12 space-y-12">
        <CategorySection title="Популярное сейчас" items={popularContent} />
        <CategorySection title="Новинки" items={newContent} />
        <CategorySection title="Сериалы" items={seriesContent} />
      </div>
    </main>
  );
}

function CategorySection({ title, items }: { title: string; items: Content[] }) {
  const scrollRef = typeof window !== 'undefined' ? null : null; // Using ref in a client component pattern if needed, but we'll use a simple approach

  return (
    <section className="relative group/section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold hover:text-primary transition-colors cursor-pointer inline-block">
          {title}
        </h2>
        <div className="flex gap-2 opacity-0 group-hover/section:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              const el = e.currentTarget.parentElement?.parentElement?.nextElementSibling;
              if (el) el.scrollBy({ left: -800, behavior: 'smooth' });
            }}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={(e) => {
              const el = e.currentTarget.parentElement?.parentElement?.nextElementSibling;
              if (el) el.scrollBy({ left: 800, behavior: 'smooth' });
            }}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4">
        {items.map((item) => (
          <div key={item.id} className="min-w-[180px] md:min-w-[220px] snap-start">
            <MovieCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

function MovieCard({ item }: { item: Content }) {
  return (
    <Link href={`/movie/${item.id}`} className="group cursor-pointer block">
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
  );
}
