import { image } from "./projects.ts";

export const articles = [
  {
    slug: "the-quiet-power-of-minimal-architecture", title: "The Quiet Power of Minimal Architecture", date: "2026-10-12", category: "Architecture",
    image: image("/images/journal/minimal-architecture.jpg"), summary: "Restraint is not the absence of ideas. It is the work of deciding which ones deserve a place.",
    sections: [
      { paragraphs: ["A quiet building is not necessarily a simple building. What appears effortless from a distance may depend on a hundred decisions about structure, proportion and the meeting of materials. The work lies in resolving those decisions until the building no longer asks you to notice them.", "Minimal architecture is often described through what it removes. But subtraction alone cannot make a room feel generous. A space still needs to hold the rhythms of daily life: a place to leave a bag, somewhere to read, a table that catches the morning light."] },
      { heading: "Give each element a reason", paragraphs: ["A well-placed opening can do more than an elaborate facade. It can frame a tree, bring light deep into a plan or give a person a sense of orientation. When an element serves several purposes, less starts to feel like enough.", "This does not require every surface to be empty. Books, textiles and objects can belong to a restrained room. The distinction is between a space with a clear order and one that has simply been left bare."] },
      { heading: "Let the ordinary carry the space", paragraphs: ["The most lasting qualities of a room are often modest: a comfortable proportion, light that changes through the day, a material that feels good under a hand. These are not qualities that announce themselves in a photograph.", "A considered space allows them to remain visible. Its quietness becomes useful, making room for the people who live there rather than asking them to live around a design statement."] },
    ],
  },
  {
    slug: "materiality-where-texture-meets-emotion", title: "Materiality: Where Texture Meets Emotion", date: "2026-10-05", category: "Materials",
    image: image("/images/journal/materiality.jpg"), summary: "Stone, timber and plaster do more than finish a room. They shape the way it feels to spend time there.",
    sections: [
      { paragraphs: ["We meet a room through its surfaces before we understand its plan. The cool edge of a stone counter, the grain of a timber door and the slight unevenness of plaster give a space an immediate physical character.", "Choosing materials is therefore more than choosing a palette. Each surface has a temperature, a way of reflecting light and a pattern of change. Together, those qualities can make a room feel still, formal, intimate or open."] },
      { heading: "A conversation, not a collection", paragraphs: ["A small set of materials can hold a great deal of variation. The same timber looks different in broad panels and fine slats. Stone can be honed where it is touched and left rough where it catches sidelight.", "The aim is not to include every beautiful finish. It is to understand how neighbouring materials affect one another. A softer surface can temper the weight of concrete; a darker edge can give pale plaster more depth."] },
      { heading: "Allow for time", paragraphs: ["A material should be considered in use, not only on the day it is installed. Timber may deepen in colour. Brass may lose its initial brightness. Stone needs a finish and care routine suited to where it is placed.", "These changes need not be defects. When they are anticipated, they can become part of a room's character. The more useful question is whether a material can age honestly alongside the life taking place around it."] },
    ],
  },
  {
    slug: "designing-with-shadow-light-and-space", title: "Designing with Shadow, Light, and Space", date: "2026-09-24", category: "Spatial studies",
    image: image("/images/journal/light-and-shadow.jpg"), summary: "A room is never quite the same twice. Daylight makes architecture a moving experience.",
    sections: [
      { paragraphs: ["Light makes a wall legible. A narrow beam reveals the grain of timber; a broad wash softens its edges. The same room can feel expansive in the morning and intimate toward evening without a single object moving.", "That change is worth designing for. Rather than treating a window as a source of maximum brightness, we can consider the direction, duration and quality of the light it admits."] },
      { heading: "Start with orientation", paragraphs: ["Different sites call for different responses. A deep reveal can filter direct sun. An opening above eye level can carry daylight further into a room while protecting privacy. A courtyard can introduce both light and a visible measure of the weather.", "The right choice depends on climate, surroundings and how a room will be used. More glazing is not automatically more comfortable, especially where heat gain and glare are already concerns."] },
      { heading: "Leave room for shadow", paragraphs: ["Shadow is not simply a problem to remove. It gives a bright surface depth and provides a place for the eye to rest. A covered threshold can make the space beyond it feel more open.", "After dark, a few carefully placed sources of light can support those same relationships. Lighting a wall, a work surface or a place to sit often creates more useful atmosphere than trying to illuminate every corner equally."] },
    ],
  },
  {
    slug: "why-timeless-interiors-outlive-trends", title: "Why Timeless Interiors Outlive Trends", date: "2026-09-10", category: "Interiors",
    image: image("/images/journal/timeless-interiors.jpg"), summary: "Enduring rooms are not frozen in a particular style. They are able to accommodate change.",
    sections: [
      { paragraphs: ["A room does not become timeless because it avoids colour or uses expensive materials. It lasts when its underlying decisions remain useful: the proportion of the space, the path between rooms and the relationship between a window and a place to sit.", "Trends can be enjoyable. They give us new references and invite experimentation. Problems arise when a short-lived visual idea becomes a permanent constraint on how a space can be used."] },
      { heading: "Separate the lasting from the changeable", paragraphs: ["The elements that are difficult to replace deserve the most patient thought. Layout, joinery and lighting positions should answer real needs. Textiles, objects and movable furniture can carry a more immediate expression.", "This distinction allows a room to evolve without requiring it to be rebuilt. A clear architectural framework is not restrictive; it can give future choices more freedom."] },
      { heading: "Design around actual life", paragraphs: ["A beautiful room that is awkward to live in will soon need changing. Storage, acoustics, maintenance and comfortable circulation are not secondary concerns. They are part of what makes an interior feel resolved.", "The goal is not to predict every future preference. It is to create a place that can welcome a different chair, another person or a new daily routine without losing its sense of balance."] },
    ],
  },
];

export function articleDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}
