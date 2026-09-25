import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  collaborators,
  type Collaborator,
  type CollaboratorLink,
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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-[0_0_24px_rgba(183,255,60,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line sm:aspect-[16/10]">
        <Image
          src={person.image}
          alt={`Portrait of ${person.name}`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-lime">
          {person.role}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-fg">{person.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-fgMuted">
          {person.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
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
  );
}

export default function Collaborators() {
  return (
    <section id="team" className="section" aria-label="2Brothers Services team">
      <div className="container-page">
        <SectionHeading
          label="Team"
          title="Meet 2Brothers"
          description="Two complementary perspectives on the people, systems, and infrastructure behind a useful digital product."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {collaborators.map((person, i) => (
            <Reveal key={person.id} delay={i * 0.08}>
              <TeamCard person={person} />
            </Reveal>
          ))}
        </div>
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
