"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 bg-[#0F0F11]/90 backdrop-blur-md  transition-all duration-300"
    >
      <div className=" max-w-[1440px] py-4 flex items-center justify-between px-8 md:px-16 mx-auto">
        <div className="flex items-center gap-12 ">
        <Link href="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter text-primary">
          <span>LUMINA</span>
          <Logo className="w-9.5 h-9.5" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
          <Link href="/movies" className="hover:text-primary transition-colors">Фильмы</Link>
          <Link href="/series" className="hover:text-primary transition-colors">Сериалы</Link>
          <Link href="/mylist" className="hover:text-primary transition-colors">Мой список</Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold cursor-pointer">
          Я
        </div>
      </div>
      </div>
    </header>
  );
}
