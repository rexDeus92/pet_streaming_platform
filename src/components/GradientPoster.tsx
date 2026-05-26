interface GradientPosterProps {
  title: string;
  className?: string;
}

export default function GradientPoster({ title, className = "" }: GradientPosterProps) {
  return (
    <div className={`relative overflow-hidden flex items-center justify-center bg-[#1A1A1D] ${className}`}>
      <div className="px-3 text-center">
        <h3 className="text-white/50 font-semibold text-[0.7rem] sm:text-xs leading-snug line-clamp-4 uppercase tracking-widest">
          {title}
        </h3>
      </div>
    </div>
  );
}
