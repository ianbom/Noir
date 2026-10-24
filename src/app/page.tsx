import { Hero, SelectedWork } from "@/components/home";
import { ContactSection } from "@/components/contact-section";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return <><Hero /><section className="statement"><Reveal><blockquote>&ldquo;Remarkable architecture begins with the relationship between people, place and purpose. The details follow from understanding how we want to live.&rdquo;</blockquote><p className="label">NOIRVA STUDIO — Architecture shaped by intention</p></Reveal></section><SelectedWork /><ContactSection /></>;
}
