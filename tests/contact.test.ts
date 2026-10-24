import assert from "node:assert/strict";
import { test } from "node:test";
import { formatBrief, validateBrief, validateAttachment, createMailto } from "../src/lib/contact.ts";

test("brief requires a name, valid email and meaningful message", () => {
  assert.equal(Object.keys(validateBrief({ name: " ", email: "not-email", message: " " })).length, 3);
  assert.deepEqual(validateBrief({ name: "Kai", email: "kai@example.com", message: "A courtyard home." }), {});
});

test("attachments are local documents or images, capped at 10MB", () => {
  assert.equal(validateAttachment({ name: "plan.pdf", size: 1024, type: "application/pdf" }), "");
  assert.ok(validateAttachment({ name: "plan.exe", size: 100, type: "application/octet-stream" }));
  assert.ok(validateAttachment({ name: "plan.pdf", size: 11 * 1024 * 1024, type: "application/pdf" }));
});

test("email draft requires a valid configured recipient and encodes the brief", () => {
  assert.equal(createMailto("", "a brief"), null);
  assert.equal(createMailto("hello@example.com\r\nBcc:bad@example.com", "a brief"), null);
  assert.match(createMailto("hello@example.com", "Light & space")!, /Light%20%26%20space/);
  assert.match(createMailto("hello#studio@example.com", "A brief")!, /^mailto:hello%23studio@example.com\?/);
});

test("brief includes attachment filename without claiming upload or delivery", () => {
  const brief = formatBrief({ name: "Kai", email: "kai@example.com", message: "A courtyard home." }, "plan.pdf");
  assert.match(brief, /plan.pdf/);
  assert.match(brief, /attach manually/i);
  assert.doesNotMatch(brief, /sent successfully|uploaded/i);
});
