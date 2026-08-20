export function Header() {
  return (
    <header className="flex items-center justify-between bg-verde-escuro px-5 py-4 text-creme">
      <div className="flex items-center gap-2.5">
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="20" fill="#368c5e" />
          <path d="M12 20 Q12 10 20 10 Q28 10 28 20 Z" fill="#fffccc" />
          <path d="M13 15 L16 19 L11 19 Z" fill="#1a5331" />
          <path d="M27 15 L24 19 L29 19 Z" fill="#1a5331" />
          <circle cx="16.5" cy="19.5" r="1.3" fill="#1a5331" />
          <circle cx="23.5" cy="19.5" r="1.3" fill="#1a5331" />
        </svg>
        <div className="leading-tight">
          <p className="font-display text-xl font-bold tracking-wide">GATIL</p>
          <p className="text-[11px] text-creme/80">Irmã Francisca</p>
        </div>
      </div>
      <span className="rounded-full bg-laranja px-3 py-1.5 text-xs font-bold text-carvao">
        Ação Solidária · 10 anos
      </span>
    </header>
  );
}
