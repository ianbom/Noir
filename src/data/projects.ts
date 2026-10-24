import assets from "./assets.json" with { type: "json" };

export type Media = { src: string; width: number; height: number; alt: string; position?: string };
export type Category = "RESIDENTIAL" | "COMMERCIAL";
export type Project = { slug: string; title: string; category: Category; type: string; location: string; services: string; narrative: string; description: string; images: Media[] };

export function image(path: string, alt?: string, position?: string): Media {
  const asset = (assets as Record<string, { width: number; height: number; alt: string }>)[path];
  if (!asset) throw new Error(`Missing asset: ${path}`);
  return { src: path, width: asset.width, height: asset.height, alt: alt || asset.alt, position };
}

const concepts: Omit<Project, "images">[] = [
  { slug: "obsidian-residence", title: "Obsidian Residence", category: "RESIDENTIAL", type: "Private residence", location: "Tropical urban setting", services: "Architecture & interiors", narrative: "A quiet counterpoint to the city. Dark mineral surfaces frame pockets of daylight, while a planted threshold turns arrival into a slower ritual.", description: "An editorial concept study of shelter and contrast: tactile concrete, deep reveals and a sequence of rooms that open gradually toward a private garden." },
  { slug: "atria-house", title: "Atria House", category: "RESIDENTIAL", type: "Courtyard house", location: "Low-density urban setting", services: "Architecture & spatial planning", narrative: "Built around an absence. A central courtyard brings light, air and the changing weather into the ordinary routines of home.", description: "This concept explores a family of connected spaces rather than a single open room. Warm timber and pale stone temper the geometry of the plan." },
  { slug: "solstice-villa", title: "Solstice Villa", category: "RESIDENTIAL", type: "Retreat residence", location: "Coastal landscape", services: "Architecture & interiors", narrative: "Long shadows, open horizons. A retreat imagined as a series of sheltered edges between the interior and the landscape.", description: "A study in orientation, privacy and the rhythm of a day. Low volumes and deep overhangs offer a restrained framework for living close to the outdoors." },
  { slug: "the-monolith-home", title: "The Monolith Home", category: "RESIDENTIAL", type: "Private residence", location: "Hillside terrain", services: "Architectural concept", narrative: "A solid outer form gives way to a surprisingly soft interior: warm surfaces, filtered light and places to withdraw.", description: "An investigation of weight and openness. The concept pairs sculptural volumes with carefully placed apertures, letting the landscape appear in deliberate fragments." },
  { slug: "haven-courtyard", title: "Haven Courtyard", category: "RESIDENTIAL", type: "Garden residence", location: "Sheltered suburban site", services: "Architecture & landscape concept", narrative: "A home measured by its gardens. Rooms gather around planted voids, connected by quiet passages and changing pools of light.", description: "This spatial study treats the courtyard as an everyday room. Earthy finishes and shaded transitions bring a sense of continuity between inside and out." },
  { slug: "villa-cendana", title: "Villa Cendana", category: "RESIDENTIAL", type: "Tropical retreat", location: "Tropical garden setting", services: "Architecture & interiors", narrative: "Timber, shade and open air. An intimate retreat that takes its cues from the unhurried pace of a tropical landscape.", description: "An editorial exploration of veranda living. Natural textures and generous openings create a series of spaces that feel protected without being enclosed." },
  { slug: "stonehaven-residence", title: "Stonehaven Residence", category: "RESIDENTIAL", type: "Private residence", location: "Woodland edge", services: "Interior architecture", narrative: "Stone anchors the room; light changes it. A material-led approach to interiors that invites touch and rewards a closer look.", description: "A concept palette of textured masonry, softly grained timber and warm neutral textiles. The emphasis is on proportion and useful, enduring spaces." },
  { slug: "the-linear-house", title: "The Linear House", category: "RESIDENTIAL", type: "Linear residence", location: "Narrow urban site", services: "Architecture & spatial planning", narrative: "A single line connects arrival, living and garden. Along it, changes in ceiling height create a rhythm of gathering and retreat.", description: "This concept asks how a constrained site can feel generous. Framed views, built-in storage and light from above make every threshold work a little harder." },
  { slug: "maison-noir-gallery", title: "Maison Noir Gallery", category: "COMMERCIAL", type: "Art & design gallery", location: "Urban cultural district", services: "Interior architecture & lighting", narrative: "A room that knows when to step back. A gallery imagined around the quiet dialogue between objects, surfaces and the person looking.", description: "A study of carefully directed light and unbroken sightlines. Restrained finishes leave room for the scale, texture and presence of the work itself." },
  { slug: "atelier-one-workspace", title: "Atelier One Workspace", category: "COMMERCIAL", type: "Creative workspace", location: "Adapted urban building", services: "Workplace interiors", narrative: "Room to think, room to meet. A workplace that gives equal weight to focused concentration and the informal exchange of ideas.", description: "This editorial concept combines shared tables with smaller places of retreat. Natural materials and generous daylight soften a clear, practical plan." },
  { slug: "sora-hospitality", title: "Sora Hospitality", category: "COMMERCIAL", type: "Boutique hospitality", location: "Quiet coastal destination", services: "Hospitality interiors", narrative: "An arrival without spectacle. A sequence of warm, intimate spaces allows the journey to fall away and the landscape to come forward.", description: "A concept study in the rituals of hospitality: a welcoming threshold, a comfortable place to pause, and a material palette that feels grounded in its setting." },
  { slug: "forma-retail-space", title: "Forma Retail Space", category: "COMMERCIAL", type: "Design retail", location: "Neighbourhood shopping street", services: "Retail interiors & display", narrative: "Less display, more discovery. Objects sit within a calm architectural framework, with enough space around them to be understood.", description: "An editorial retail study organised around intuitive movement and tactile material contrasts. Flexible display elements support a changing collection without visual clutter." },
];

export const projects: Project[] = concepts.map((project) => ({ ...project, images: [1, 2, 3, 4].map((number) => image(`/images/projects/${project.slug}/${number}.jpg`)) }));

export const slides = [
  { project: projects[0], lines: ["Spaces beyond", "the ordinary."], description: "Considered architecture. A quieter way to live." },
  { project: projects[2], lines: ["Designed to", "be experienced."], description: "Spaces that bring light, landscape and daily life together." },
  { project: projects[3], lines: ["Architecture with", "lasting character."], description: "Honest materials. Precise proportions. Room to belong." },
  { project: projects[8], lines: ["Form, light", "and intention."], description: "An exploration of the details that give a place its presence." },
  { project: projects[6], lines: ["Timeless spaces.", "Distinctive living."], description: "A thoughtful relationship between people, place and purpose." },
];

export function filterProjects(category: "ALL" | Category) {
  return category === "ALL" ? projects : projects.filter((project) => project.category === category);
}
