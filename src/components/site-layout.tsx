"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigation, site } from "@/data/site-config";

export function Wordmark() {
  return <span className="wordmark"><svg viewBox="0 0 36 49" fill="none" aria-hidden="true"><path d="M3 46V3L33 46V3M3 3L33 46M10 46V22M26 3V27" stroke="currentColor" strokeWidth="1.2" /></svg><span className="wordmark-name">NOIRVA<span className="wordmark-small">STUDIO</span></span></span>;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><Link href="/" aria-label="NOIRVA STUDIO home"><Wordmark /></Link><nav className="desktop-nav" aria-label="Main navigation">{navigation.map((item) => <Link key={item.label} href={item.href} className={`nav-link ${item.label === "Contact" ? "nav-contact" : ""}`} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button className="mobile-toggle" aria-label="Open navigation"><Menu size={21} /></button></SheetTrigger><SheetContent className="w-full border-[#303030] bg-[#111111] px-[7vw] pt-20 sm:max-w-md"><SheetHeader className="text-left"><SheetTitle className="text-[#f4f1ea]"><Wordmark /></SheetTitle><SheetDescription className="mt-6 text-[#a3a3a3]">Architecture shaped by intention.</SheetDescription></SheetHeader><nav className="mobile-menu-links" aria-label="Mobile navigation">{navigation.map((item) => <Link href={item.href} key={item.label} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav><p className="label text-[10px]">Architecture & Interior Design</p></SheetContent></Sheet></header></>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-brand"><Link href="/" aria-label="NOIRVA STUDIO home"><Wordmark /></Link><p className="footer-copyright">© 2026 NOIRVA STUDIO.<br />All rights reserved.</p></div><nav className="footer-links" aria-label="Footer navigation">{navigation.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}{site.instagramUrl && <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>}</nav></footer>;
}
