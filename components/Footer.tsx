import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { siteConfig } from "@/data/site";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Why us", href: "#why" },
  { label: "Selected work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bgSoft">
      <div className="container-page py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fgMuted">
              Tailored websites, business systems, and custom software for
              modern businesses.
            </p>
            <SocialLinks variant="footer" className="mt-6" />
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-lime">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-fgMuted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-lime">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-fgMuted">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-fg"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-fg"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-fgFaint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} 2Brothers Services</p>
          <p>Digital solutions for modern businesses.</p>
        </div>
      </div>
    </footer>
  );
}
