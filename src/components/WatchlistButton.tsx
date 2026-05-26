"use client";

import { useState, useEffect } from "react";

interface WatchlistButtonProps {
  id: string;
  className?: string;
}

const STORAGE_KEY = "lumina_watchlist";

function getWatchlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setWatchlist(list: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function WatchlistButton({ id, className = "" }: WatchlistButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(getWatchlist().includes(id));
  }, [id]);

  const toggle = () => {
    const list = getWatchlist();
    let newList: string[];

    if (list.includes(id)) {
      newList = list.filter((item) => item !== id);
      setIsAdded(false);
    } else {
      newList = [...list, id];
      setIsAdded(true);
    }

    setWatchlist(newList);
  };

  return (
    <button
      onClick={toggle}
      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
        isAdded
          ? "bg-primary/20 border-primary text-primary hover:bg-primary/10"
          : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
      } ${className}`}
    >
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${isAdded ? "scale-110" : ""}`}
        fill={isAdded ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      {isAdded ? "В моём списке" : "Буду смотреть"}
    </button>
  );
}
