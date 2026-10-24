import concurrent.futures
import io
import json
from pathlib import Path
import urllib.request

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
catalog = json.loads((ROOT / "docs/asset-candidates.json").read_text(encoding="utf-8"))
groups = {
    "obsidian-residence": [6, 161, 43, 169],
    "atria-house": [20, 21, 142, 40],
    "solstice-villa": [16, 24, 27, 19],
    "the-monolith-home": [4, 7, 8, 12],
    "haven-courtyard": [10, 35, 41, 44],
    "villa-cendana": [28, 34, 39, 30],
    "stonehaven-residence": [9, 13, 14, 0],
    "the-linear-house": [23, 5, 3, 2],
    "maison-noir-gallery": [57, 49, 56, 58],
    "atelier-one-workspace": [63, 65, 62, 70],
    "sora-hospitality": [75, 76, 77, 79],
    "forma-retail-space": [92, 98, 99, 97],
}
assignments = [(f"/images/projects/{slug}/{number}.jpg", index) for slug, indices in groups.items() for number, index in enumerate(indices, 1)]
assignments += [
    ("/images/team/adrian-mahesa.jpg", 108),
    ("/images/team/keira-anindya.jpg", 112),
    ("/images/team/rafael-pratama.jpg", 118),
    ("/images/journal/minimal-architecture.jpg", 3),
    ("/images/journal/materiality.jpg", 158),
    ("/images/journal/light-and-shadow.jpg", 160),
    ("/images/journal/timeless-interiors.jpg", 41),
    ("/images/about/studio.jpg", 73),
]


def download(assignment):
    path, index = assignment
    item = catalog[index]
    request = urllib.request.Request(item["url"] + "?w=2200&q=88&fit=max&fm=jpg", headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=60) as response:
        photo = Image.open(io.BytesIO(response.read())).convert("RGB")
    photo.thumbnail((2200, 2600))
    target = ROOT / "public" / path.lstrip("/")
    target.parent.mkdir(parents=True, exist_ok=True)
    photo.save(target, quality=88, optimize=True, progressive=True)
    return path, {"width": photo.width, "height": photo.height, "alt": item["alt"], "photographer": item["photographer"].replace("/@", ""), "source": "https://unsplash.com" + item["source"], "imageUrl": item["url"], "license": "https://unsplash.com/license", "usage": "Illustrative portrait for a fictional editorial persona" if "/team/" in path else "Editorial concept imagery; not a commissioned-project claim"}


with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    manifest = dict(pool.map(download, assignments))
(ROOT / "src/data/assets.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
(ROOT / "docs/asset-credits.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(f"Downloaded and decoded {len(manifest)} images.")
