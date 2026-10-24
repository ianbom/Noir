export type Brief = { name: string; email: string; message: string };
export type BriefErrors = Partial<Record<keyof Brief, string>>;

const emailPattern = /^[^\s@<>?,;:\r\n]+@[^\s@<>?,;:\r\n]+\.[^\s@<>?,;:\r\n]+$/;

export function validateBrief(brief: Brief): BriefErrors {
  const errors: BriefErrors = {};
  if (!brief.name.trim() || brief.name.length > 120) errors.name = "Enter your name (up to 120 characters).";
  if (!emailPattern.test(brief.email.trim()) || brief.email.length > 254) errors.email = "Enter a valid email address.";
  if (!brief.message.trim() || brief.message.length > 5000) errors.message = "Tell us about your space (up to 5,000 characters).";
  return errors;
}

export function validateAttachment(file: { name: string; size: number; type: string }): string {
  if (file.size > 10 * 1024 * 1024) return "Choose a file smaller than 10MB.";
  const extension = file.name.split(".").pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = { pdf: "application/pdf", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };
  if (!extension || !mimeTypes[extension] || (file.type && file.type !== mimeTypes[extension])) return "Choose a PDF, JPEG, PNG or WebP file.";
  return "";
}

export function formatBrief(brief: Brief, filename?: string): string {
  return ["NOIRVA STUDIO / Project inquiry", "", `Name: ${brief.name.trim()}`, `Email: ${brief.email.trim()}`, "", brief.message.trim(), ...(filename ? ["", `Reference file: ${filename} (attach manually in your email app; file remains local).`] : [])].join("\n");
}

export function createMailto(recipient: string, brief: string): string | null {
  if (!emailPattern.test(recipient)) return null;
  return `mailto:${encodeURIComponent(recipient).replace(/%40/g, "@")}?subject=${encodeURIComponent("NOIRVA STUDIO / Project inquiry")}&body=${encodeURIComponent(brief)}`;
}
