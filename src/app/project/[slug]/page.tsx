import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialHero, NextStory } from "@/components/editorial";
import { projects } from "@/data/projects";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.narrative, openGraph: { title: project.title, description: project.narrative, images: [project.images[0].src] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return <><EditorialHero image={project.images[0]} label={`${project.category} / Concept study`} className="project-hero">{project.title}</EditorialHero><dl className="project-meta"><div><dt>TYPE</dt><dd>{project.type}</dd></div><div><dt>CONCEPTUAL SETTING</dt><dd>{project.location}</dd></div><div><dt>DESIGN SERVICES</dt><dd>{project.services}</dd></div><div><dt>STATUS</dt><dd>Concept study</dd></div></dl><section className="project-narrative"><blockquote>&ldquo;{project.narrative}&rdquo;</blockquote><p>{project.description}</p><p className="form-hint">An editorial concept, illustrated through a curated photographic study of spaces and materials.</p></section><section className="project-gallery" aria-label={`${project.title} photographic study`}>{project.images.map((photo, photoIndex) => <div key={photo.src} className={`gallery-image ${photoIndex === 2 || photoIndex === project.images.length - 1 ? "gallery-wide" : ""}`}><Image src={photo.src} alt={photo.alt} fill sizes={photoIndex >= 2 ? "90vw" : "45vw"} className="image-fill" style={{ objectPosition: photo.position }} /></div>)}</section><div className="portfolio-return"><Link className="action action-outline" href="/#projects">Back to selected work</Link></div><NextStory href={`/project/${next.slug}`} label="Next project" title={next.title} image={next.images[0]} /></>;
}
