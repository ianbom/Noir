import Image from "next/image";
import Link from "next/link";
import type { Media } from "@/data/projects";

export function EditorialHero({ image, label, children, className = "" }: { image: Media; label: string; children: React.ReactNode; className?: string }) {
  return <section className={`editorial-hero ${className}`}><Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="image-fill hero-layer" style={{ objectPosition: image.position }} /><div className="hero-shade" /><div className="editorial-hero-content"><p className="label">{label}</p><h1>{children}</h1></div></section>;
}

export function NextStory({ href, label, title, image }: { href: string; label: string; title: string; image: Media }) {
  return <Link href={href} className="next-story"><Image src={image.src} alt="" fill sizes="100vw" className="image-fill hero-layer" /><div className="hero-shade" /><div><p className="label">{label}</p><h2>{title} <span aria-hidden="true">→</span></h2></div></Link>;
}
