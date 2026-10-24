import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialHero } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { image } from "@/data/projects";
import { team } from "@/data/team";

export const metadata: Metadata = { title: "About", description: "The NOIRVA perspective: thoughtful architecture, material exploration and a human approach to space." };

export default function AboutPage() {
  return <><EditorialHero image={image("/images/about/studio.jpg")} label="About the studio">The thinking behind<br />the spaces we imagine.</EditorialHero><section className="statement about-statement"><Reveal><blockquote>&ldquo;Architecture, interiors and the life between them. A considered approach to spaces that feel as good as they look.&rdquo;</blockquote></Reveal></section><div aria-label="Editorial team profiles">{team.map((member, index) => <section className="team-profile" key={member.name}><p className="team-number">0{index + 1} / 03</p><div className="team-image"><Image src={member.image.src} alt={`Illustrative editorial portrait for the ${member.role.toLowerCase()} profile`} fill sizes="(max-width: 767px) 90vw, 34vw" className="image-fill" /></div><Reveal className="team-copy"><p className="label">{member.role}</p><h2>{member.name}</h2><p className="profile-note">Fictional editorial persona · Illustrative portrait</p>{member.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</Reveal></section>)}</div><section className="about-cta"><h2>What could your space become?</h2><Link className="action" href="/#contact">Begin a conversation</Link></section></>;
}
