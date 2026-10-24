import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles, articleDate } from "@/data/articles";

export const metadata: Metadata = { title: "Journal", description: "Original notes on architecture, material, light and the spaces of everyday life." };

export default function JournalPage() {
  return <><header className="journal-heading"><p className="label">Journal</p><h1>Notes on space,<br />material & intention.</h1></header><section className="journal-grid" aria-label="Journal articles">{articles.map((article) => <Link className="article-card" href={`/journal/${article.slug}`} key={article.slug}><div className="article-card-image"><Image src={article.image.src} alt={article.image.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1130px) 45vw, 30vw" className="image-fill" /></div><div className="article-meta"><time dateTime={article.date}>{articleDate(article.date)}</time><span aria-hidden="true"> / </span>{article.category}</div><h2>{article.title}</h2><p>{article.summary}</p></Link>)}</section></>;
}
