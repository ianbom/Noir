import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { projects, slides, filterProjects } from "../src/data/projects.ts";
import { articles } from "../src/data/articles.ts";
import { team } from "../src/data/team.ts";
import { site } from "../src/data/site-config.ts";

test("twelve unique concept projects, eight residential and four commercial", () => {
  assert.equal(projects.length, 12);
  assert.equal(new Set(projects.map((project) => project.slug)).size, 12);
  assert.equal(filterProjects("ALL").length, 12);
  assert.equal(filterProjects("RESIDENTIAL").length, 8);
  assert.equal(filterProjects("COMMERCIAL").length, 4);
  assert.equal(slides.length, 5);
});

test("each project has a curated gallery of four to seven distinct local images", () => {
  for (const project of projects) {
    assert.ok(project.images.length >= 4 && project.images.length <= 7);
    assert.equal(new Set(project.images.map((image) => image.src)).size, project.images.length);
    for (const image of project.images) {
      assert.ok(existsSync(`public${image.src}`), image.src);
      assert.ok(image.width > 700 && image.height > 700, image.src);
      assert.ok(image.alt);
    }
  }
});

test("journal and team data are complete without invented contacts", () => {
  assert.equal(articles.length, 4);
  assert.equal(new Set(articles.map((article) => article.slug)).size, 4);
  for (const article of articles) {
    assert.ok(article.sections.length >= 3);
    assert.ok(existsSync(`public${article.image.src}`));
    assert.ok(new Date(article.date).getTime() <= new Date("2026-10-24").getTime());
  }
  assert.equal(team.length, 3);
  for (const person of team) assert.ok(existsSync(`public${person.image.src}`));
  assert.equal(site.contactEmail, "");
  assert.equal(site.instagramUrl, "");
});

test("all downloaded images carry source and license provenance", () => {
  const manifest = JSON.parse(readFileSync("docs/asset-credits.json", "utf8"));
  for (const [path, asset] of Object.entries(manifest) as [string, { source: string; license: string; photographer: string }][]) {
    assert.ok(existsSync(`public${path}`), path);
    assert.match(asset.source, /^https:\/\/unsplash.com\/photos\//);
    assert.equal(asset.license, "https://unsplash.com/license");
    assert.ok(asset.photographer);
  }
});
