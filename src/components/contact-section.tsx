"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { Paperclip, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createMailto, formatBrief, validateAttachment, validateBrief, type BriefErrors } from "@/lib/contact";
import { site } from "@/data/site-config";
import { projects } from "@/data/projects";

export function ContactSection() {
  const [errors, setErrors] = useState<BriefErrors>({});
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState("");
  const [fallback, setFallback] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const mailto = createMailto(site.contactEmail, "");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const brief = { name: String(values.get("name") || ""), email: String(values.get("email") || ""), message: String(values.get("message") || "") };
    const validation = validateBrief(brief);
    setErrors(validation);
    setStatus("");
    setFallback("");
    const firstError = Object.keys(validation)[0];
    if (firstError) { form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus(); return; }
    setFileError("");
    const text = formatBrief(brief, attachment?.name);
    const draft = createMailto(site.contactEmail, text);
    if (draft) {
      window.location.href = draft;
      setStatus("Email draft requested. Review it in your email app and attach any reference file manually. Nothing has been sent by this website.");
      setFallback(text);
      return;
    }
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setStatus("Brief copied. Paste it into your preferred email or messaging app. Your reference file remains on this device.");
    } catch {
      setFallback(text);
      setStatus("Copy is unavailable in this browser. Select and copy your prepared brief below.");
    }
  }

  return <section id="contact" className="contact-section"><Image src={projects[5].images[0].src} alt="" fill sizes="100vw" className="image-fill contact-background" /><h2 className="contact-heading">Let&apos;s create something<br />with intention.</h2><p className="contact-description">A new home. A different way to gather.<br />Begin with what matters to you.</p><div className="contact-actions"><a className="action" href="#project-brief">Prepare a project brief</a>{mailto ? <a className="action action-outline" href={mailto}>Email the studio</a> : <Link className="action action-outline" href="/about">Our perspective</Link>}</div><form id="project-brief" className="brief-form" noValidate onSubmit={submit}><p className="label">Tell us about your space</p><div className="form-field"><Label htmlFor="brief-name">Your name</Label><Input id="brief-name" name="name" autoComplete="name" maxLength={120} required placeholder="Name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className="h-12 rounded-none border-[#ffffff26] bg-[#ffffff05] px-4" />{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}</div><div className="form-field"><Label htmlFor="brief-email">Email address</Label><Input id="brief-email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@yourdomain.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className="h-12 rounded-none border-[#ffffff26] bg-[#ffffff05] px-4" />{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}</div><div className="form-field"><Label htmlFor="brief-message">Your project</Label><Textarea id="brief-message" name="message" rows={5} maxLength={5000} required placeholder="The place, the possibilities, the way you want to live." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className="min-h-36 rounded-none border-[#ffffff26] bg-[#ffffff05] p-4" />{errors.message && <p id="message-error" className="field-error">{errors.message}</p>}</div><div className="form-field"><Label htmlFor="brief-file" className="flex items-center gap-2"><Paperclip size={14} aria-hidden="true" />Reference file (optional)</Label><Input ref={fileInput} id="brief-file" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" aria-describedby={fileError ? "file-hint file-error" : "file-hint"} aria-invalid={!!fileError} className="h-auto min-h-12 rounded-none border-[#ffffff26] bg-transparent px-3 py-3 text-xs file:mr-3 file:text-[#f4f1ea]" onChange={(event) => { const file = event.target.files?.[0]; setStatus(""); setAttachment(null); if (!file) { setFileError(""); return; } const error = validateAttachment(file); setFileError(error); if (error) { event.target.value = ""; return; } setAttachment(file); }} /><p id="file-hint" className="form-hint">PDF, JPEG, PNG or WebP · Up to 10MB.<br />Files stay on this device. Attach manually when emailing your brief.</p>{fileError && <p id="file-error" className="field-error" role="alert">{fileError}</p>}{attachment && <div className="file-row"><span>{attachment.name}</span><button className="text-button" type="button" aria-label="Remove reference file" onClick={() => { setAttachment(null); setFileError(""); setStatus(""); if (fileInput.current) fileInput.current.value = ""; }}><X size={16} /></button></div>}</div><Button className="action h-auto rounded-none" type="submit">{mailto ? "Open email draft" : "Copy project brief"}</Button><p className="form-hint">{mailto ? "Opens your email app for review. You choose when to send." : "Prepare a brief to copy and share. This website does not send messages."}</p>{status && <p className="form-status" role="status">{status}</p>}{fallback && <div className="form-field"><Label htmlFor="prepared-brief">Your prepared brief</Label><Textarea id="prepared-brief" readOnly value={fallback} rows={9} onFocus={(event) => event.target.select()} className="rounded-none border-[#756650]" /></div>}</form><div className="contact-notes"><div><p className="label">Perspective</p><p>Contemporary architecture.<br />Considered interiors.</p></div><div><p className="label">Selected work</p><p>Editorial concept studies in<br />material, light and everyday life.</p></div><div><p className="label">Starting point</p><p>A clear brief.<br />A thoughtful conversation.</p></div></div></section>;
}
