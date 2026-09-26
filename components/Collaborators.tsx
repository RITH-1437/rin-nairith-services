import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  collaborators,
  teamPhotos,
  type Collaborator,
  type CollaboratorLink,
  type TeamPhoto,
} from "@/data/collaborators";

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

function TeamCard({ person }: { person: Collaborator }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-[0_0_24px_rgba(183,255,60,0.08)]">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-line">
          <Image
            src={person.image}
            alt=""
            fill
            sizes="80px"
            className="object-cover object-center"
          />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-lime">
            {person.role}
          </p>
          <h3 className="mt-1.5 text-lg font-semibold text-fg">{person.name}</h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-fgMuted">
        {person.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {person.links.map((link) => (
          <SocialIconLink
            key={`${person.id}-${link.label}`}
            link={link}
            name={person.name}
          />
        ))}
      </div>
    </article>
  );
}

function TeamPhotoCard({ photo }: { photo: TeamPhoto }) {
  return (
    <figure className="group overflow-hidden rounded-xl border border-line bg-panel">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={photo.image}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, 336px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="border-t border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fgFaint">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

export default function Collaborators() {
  return (
    <section id="team" className="section" aria-label="2Brothers Services team">
      <div className="container-page">
        <SectionHeading
          label="Team"
          title="Meet 2Brothers"
          description="2Brothers Services is a small, two-person development team. You work directly with the people building and deploying your project."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {collaborators.map((person, i) => (
            <Reveal key={person.id} delay={i * 0.08}>
              <TeamCard person={person} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12">
            <p className="text-center font-mono text-xs uppercase tracking-[0.16em] text-fgFaint">
              Working together
            </p>
            <div className="mx-auto mt-5 grid max-w-2xl gap-5 sm:grid-cols-2">
              {teamPhotos.map((photo) => (
                <TeamPhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <a href="#contact" className="link-accent mx-auto mt-8 flex w-fit items-center gap-1 text-sm font-medium">
            Work with the team
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
