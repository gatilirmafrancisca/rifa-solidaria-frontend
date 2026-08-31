import { ImageWithFallback } from "@/components/ImageWithFallback";
import avatarImg from "@/assets/avatar.png";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-verde-escuro px-5 py-4 text-creme">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10">
          <ImageWithFallback 
              src={avatarImg} 
              alt="Avatar Principal" 
              className="w-full h-full object-contain rounded-full"
            />
        </div>
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
