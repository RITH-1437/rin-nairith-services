import RinWordmark from "./RinWordmark";
import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bgSoft">
      <div className="container-page flex justify-center py-12">
        <a
          href={siteConfig.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RIN NAIRITH — portfolio"
          className="group flex justify-center transition-transform duration-300 hover:scale-[1.02]"
        >
          <RinWordmark className="h-20 w-auto transition-opacity duration-300 group-hover:opacity-90 sm:h-28" />
        </a>
      </div>
    </footer>
  );
}
