import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialHero, NextStory } from "@/components/editorial";
import { articles, articleDate } from "@/data/articles";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) return {};
  return { title: article.title, description: article.summary, openGraph: { title: article.title, description: article.summary, type: "article", publishedTime: article.date, images: [article.image.src] } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = articles.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();
  const article = articles[index];
  const next = articles[(index + 1) % articles.length];
  return <><EditorialHero image={article.image} label={`${articleDate(article.date)} / ${article.category}`} className="article-hero">{article.title}</EditorialHero><article className="article-body" aria-label={article.title}>{article.sections.map((section, sectionIndex) => <section key={sectionIndex}>{"heading" in section && <h2>{section.heading}</h2>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<Link className="article-back" href="/journal">← Back to journal</Link></article><NextStory href={`/journal/${next.slug}`} label="Next article" title={next.title} image={next.image} /></>;
}
