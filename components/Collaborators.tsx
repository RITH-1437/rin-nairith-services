import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { ComponentType } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  collaborators,
  teamPhotos,
  type Collaborator,
  type CollaboratorLink,
} from "@/data/collaborators";
import { projects } from "@/data/projects";

function SocialIconLink({
  link,
  name,
}: {
  link: CollaboratorLink;
  name: string;
}) {
  const Icon = link.icon as ComponentType<{ className?: string }>;
  const external = link.href.startsWith("http");
  return (
    <a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${name} on ${link.label}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-fgMuted transition-colors hover:border-lime/50 hover:text-lime"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function shortProjectName(name: string): string {
  return name.split(" — ")[0];
}

function ProfilePanel({ person }: { person: Collaborator }) {
  const profile = person.profile;
  if (!profile) return null;

  return (
    <Reveal className="mx-auto mt-6 max-w-4xl">
      <div className="rounded-xl border border-line bg-panel p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-lime">
              About {person.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fgMuted">
              {profile.bio}
            </p>
          </div>
          <a
            href={profile.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0"
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            Visit Portfolio
          </a>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-lime sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-fgMuted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skillGroups.map((group) => (
            <div
              key={group.id}
              className="h-full rounded-lg border border-line bg-panelRaised p-5"
            >
              <h4 className="mb-4 font-mono text-sm uppercase tracking-[0.18em] text-lime">
                {group.label}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-xs text-fgMuted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-lime">
            Featured Projects
          </h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.projectLinks.map((item) =>
              item.url ? (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fgMuted transition-colors hover:border-lime/40 hover:text-fg"
                >
                  {item.name}
                </a>
              ) : (
                <span
                  key={item.name}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fgFaint"
                >
                  {item.name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Collaborators() {
  return (
    <section id="team" className="section" aria-label="People I build with">
      <div className="container-page">
        <SectionHeading
          label="People"
          title="People I Built With"
          description="Great things are often built together — the people I learn from, ship with, and build alongside."
        />

        {/* Group visual — main visual of the section */}
        <Reveal>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-line bg-panel p-2 transition-colors duration-300 hover:border-lime/30 sm:p-3">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {teamPhotos.map((photo) => (
                <div
                  key={photo.src}
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-line"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Individual collaborators */}
        <div className="mx-auto mt-6 grid max-w-4xl gap-5 sm:grid-cols-2">
          {collaborators.map((person, i) => (
            <Reveal key={person.id} delay={i * 0.08} className="h-full">
              <article className="group flex h-full gap-5 rounded-lg border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-[0_0_24px_rgba(183,255,60,0.08)]">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md border border-line sm:h-32 sm:w-28">
                  <Image
                    src={person.image}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-snug text-fg">
                    {person.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-lime">
                    {person.role}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-fgFaint">
                    {person.study}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fgMuted">
                    {person.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {person.links.map((link) => (
                      <SocialIconLink
                        key={`${person.id}-${link.label}`}
                        link={link}
                        name={person.name}
                      />
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Detailed profile (currently YONG Lyhor) */}
        {collaborators
          .filter((person) => person.profile)
          .map((person) => (
            <ProfilePanel key={`${person.id}-profile`} person={person} />
          ))}

        {/* Projects built together */}
        <Reveal className="mx-auto mt-6 max-w-4xl">
          <div className="rounded-xl border border-line bg-panel p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-lime">
              Projects we built together
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href="#projects"
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fgMuted transition-colors hover:border-lime/40 hover:text-fg"
                >
                  {shortProjectName(project.name)}
                </a>
              ))}
            </div>
            <a
              href="#projects"
              className="link-accent mt-4 inline-flex items-center gap-1 text-sm font-medium"
            >
              View all projects
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
