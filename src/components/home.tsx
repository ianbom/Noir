"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { filterProjects, slides, type Category } from "@/data/projects";

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (paused || hovered || reduced) return;
    const timer = setInterval(() => { if (!document.hidden) setActive((current) => (current + 1) % slides.length); }, 6000);
    return () => clearInterval(timer);
  }, [paused, hovered, reduced]);
  const slide = slides[active];
  return <section className="hero" aria-roledescription="carousel" aria-label="Architectural perspectives" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setPaused(true)}><AnimatePresence initial={false}><motion.div className="hero-layer" key={slide.project.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 1.4 }}><Image src={slide.project.images[0].src} alt={slide.project.images[0].alt} fill priority={active === 0} sizes="100vw" className="image-fill" quality={90} /></motion.div></AnimatePresence><div className="hero-shade" /><div className="hero-content"><p className="label hero-label">Architecture & Interior Design</p><div className="hero-title-space" aria-live={paused || reduced ? "polite" : "off"}><h1>{slide.lines[0]}<br />{slide.lines[1]}</h1></div><p className="hero-description">{slide.description}</p><div className="hero-controls"><Link className="action" href="/#contact">Start a project</Link><div className="slide-dots" aria-label="Choose a slide">{slides.map((item, index) => <button key={item.project.slug} className="slide-dot" aria-label={`Slide ${index + 1}: ${item.lines.join(" ")}`} aria-pressed={active === index} onClick={() => { setActive(index); setPaused(true); }} />)}{!reduced && <button className="pause-button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((current) => !current)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>}</div></div></div></section>;
}

export function SelectedWork() {
  const [category, setCategory] = useState<"ALL" | Category>("ALL");
  const reduced = useReducedMotion();
  const filtered = filterProjects(category);
  return <section id="projects" className="work"><h2 className="section-heading">Selected work</h2><div className="filters" role="group" aria-label="Filter projects">{(["ALL", "RESIDENTIAL", "COMMERCIAL"] as const).map((filter) => <button key={filter} className="filter-button" aria-pressed={filter === category} onClick={() => setCategory(filter)}>{filter}</button>)}</div><p className="sr-only" role="status">{filtered.length} {category === "ALL" ? "" : category.toLowerCase()} concept projects</p><div className="project-grid">{filtered.map((project) => <motion.div key={project.slug} initial={{ opacity: .5 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .35 }}><Link href={`/project/${project.slug}`} className="project-card"><Image src={project.images[0].src} alt={project.images[0].alt} fill sizes="(max-width: 710px) 90vw, (max-width: 1080px) 45vw, 30vw" className="image-fill" /><div className="project-caption"><p className="label">{project.category}</p><h3>{project.title}</h3></div></Link></motion.div>)}</div></section>;
}
