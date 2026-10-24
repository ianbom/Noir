import base64
import json
import os
from pathlib import Path
import time
import urllib.error
import urllib.request


origin = os.environ.get("QA_ORIGIN", "http://127.0.0.1:3047")
target = new_tab(origin)
print("QA target:", target, flush=True)
switch_tab(target)
session = cdp("Target.attachToTarget", targetId=target, flatten=True)["sessionId"]
cdp("Network.enable", session_id=session)
cdp("Network.setCacheDisabled", session_id=session, cacheDisabled=True)
cdp("Network.setBypassServiceWorker", session_id=session, bypass=True)
cdp("Runtime.enable", session_id=session)
cdp("Log.enable", session_id=session)
cdp("Page.addScriptToEvaluateOnNewDocument", session_id=session, source="window.__qaErrors=[]; addEventListener('error',event=>window.__qaErrors.push(event.message)); addEventListener('unhandledrejection',event=>window.__qaErrors.push(String(event.reason))); const originalError=console.error; console.error=(...args)=>{window.__qaErrors.push(args.map(String).join(' '));originalError(...args)};")
artifact_dir = Path("artifacts")
artifact_dir.mkdir(exist_ok=True)
results = {"origin": origin, "target": target, "viewports": [], "routes": [], "interactions": [], "errors": []}


def evaluate(expression):
    return js(expression, target_id=target)


def navigate(path):
    cdp("Page.navigate", session_id=session, url=origin + path)
    for attempt in range(100):
        time.sleep(.1)
        try:
            if evaluate("document.readyState === 'complete' && !!document.querySelector('main h1')"):
                break
        except RuntimeError:
            pass
    time.sleep(.35)


def viewport(width, height=900):
    cdp("Emulation.setDeviceMetricsOverride", session_id=session, width=width, height=height, deviceScaleFactor=1, mobile=width < 768)


def screenshot(name):
    encoded = cdp("Page.captureScreenshot", session_id=session, format="jpeg", quality=75)["data"]
    (artifact_dir / name).write_bytes(base64.b64decode(encoded))


def click(name, role="button"):
    nodes = cdp("Accessibility.getFullAXTree", session_id=session)["nodes"]
    node = next(node for node in nodes if node.get("role", {}).get("value") == role and " ".join(node.get("name", {}).get("value", "").split()).casefold() == name.casefold() and node.get("backendDOMNodeId"))
    backend = node["backendDOMNodeId"]
    cdp("DOM.scrollIntoViewIfNeeded", session_id=session, backendNodeId=backend)
    time.sleep(.15)
    quad = cdp("DOM.getBoxModel", session_id=session, backendNodeId=backend)["model"]["content"]
    horizontal = sum(quad[0::2]) / 4
    vertical = sum(quad[1::2]) / 4
    cdp("Input.dispatchMouseEvent", session_id=session, type="mousePressed", x=horizontal, y=vertical, button="left", clickCount=1)
    cdp("Input.dispatchMouseEvent", session_id=session, type="mouseReleased", x=horizontal, y=vertical, button="left", clickCount=1)
    time.sleep(.3)


def key(name):
    cdp("Input.dispatchKeyEvent", session_id=session, type="keyDown", key=name, code=name, windowsVirtualKeyCode={"Escape": 27, "Tab": 9}.get(name, 0))
    cdp("Input.dispatchKeyEvent", session_id=session, type="keyUp", key=name, code=name, windowsVirtualKeyCode={"Escape": 27, "Tab": 9}.get(name, 0))
    time.sleep(.15)


def fill(name, text):
    click(name, "textbox")
    cdp("Input.insertText", session_id=session, text=text)


core_paths = ["/", "/about", "/journal", "/project/obsidian-residence", "/journal/the-quiet-power-of-minimal-architecture"]
for width in [1440, 1280, 768, 390, 375]:
    viewport(width, 900 if width >= 768 else 844)
    for path in core_paths:
        navigate(path)
        evaluate("scrollTo({top:0,behavior:'instant'})")
        time.sleep(.3)
        geometry = evaluate("({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,hero:Math.round(document.querySelector('main section')?.getBoundingClientRect().height||0),heading:document.querySelector('h1').innerText,headerHeight:Math.round(document.querySelector('header').getBoundingClientRect().height),menuVisible:getComputedStyle(document.querySelector('.mobile-toggle')).display!=='none'})")
        assert not geometry["overflow"], (path, width, geometry)
        assert geometry["menuVisible"] == (width < 768), (path, width, geometry)
        results["viewports"].append({"path": path, **geometry})
        print("Viewport:", width, path, flush=True)
        name = "home" if path == "/" else path.strip("/").replace("/", "-")
        screenshot(f"{name}-{width}.jpg")
        for position in range(0, int(evaluate("document.documentElement.scrollHeight")), 650):
            evaluate(f"scrollTo({{top:{position},behavior:'instant'}})")
            time.sleep(.15)
        runtime_errors = evaluate("window.__qaErrors || []")
        assert not runtime_errors, (path, width, runtime_errors)

viewport(1440)
navigate("/")
project_paths = evaluate("[...document.querySelectorAll('.project-card')].map(link=>new URL(link.href).pathname)")
navigate("/journal")
article_paths = evaluate("[...document.querySelectorAll('.article-card')].map(link=>new URL(link.href).pathname)")
for path in ["/", "/about", "/journal", *project_paths, *article_paths]:
    response = urllib.request.urlopen(origin + path)
    assert response.status == 200, path
    navigate(path)
    evaluate("document.querySelectorAll('img').forEach(image=>image.loading='eager')")
    for attempt in range(80):
        if evaluate("[...document.images].every(image=>image.complete&&image.naturalWidth>0)"):
            break
        time.sleep(.25)
    broken = evaluate("[...document.images].filter(image=>!image.complete||!image.naturalWidth).map(image=>image.src)")
    assert not broken, (path, broken)
    text = evaluate("document.body.innerText.toLowerCase()")
    assert not any(term in text for term in ["studio dinding", "demo website", "website clone", "template preview", "coming soon", "powered by codex", "message sent successfully"]), path
    assert not evaluate("window.__qaErrors || []"), path
    results["routes"].append({"path": path, "status": response.status, "images": evaluate("document.images.length")})
    print("Route:", path, flush=True)

for path in ["/project/not-a-project", "/journal/not-an-article", "/missing-page"]:
    try:
        urllib.request.urlopen(origin + path)
        raise AssertionError("Unknown route returned 200: " + path)
    except urllib.error.HTTPError as error:
        assert error.code == 404
        results["routes"].append({"path": path, "status": 404})

navigate("/")
click("COMMERCIAL")
assert evaluate("document.querySelectorAll('.project-card').length") == 4
click("RESIDENTIAL")
assert evaluate("document.querySelectorAll('.project-card').length") == 8
click("ALL")
assert evaluate("document.querySelectorAll('.project-card').length") == 12
results["interactions"].append("Portfolio filters: 12 / 8 / 4")
evaluate("scrollTo({top:0,behavior:'instant'})")
click("Slide 3: Architecture with lasting character.")
assert evaluate("document.querySelector('h1').innerText") == "Architecture with\nlasting character."
results["interactions"].append("Hero indicator changes slide and pauses")

viewport(390, 844)
navigate("/")
click("Open navigation")
assert evaluate("!!document.querySelector('[role=dialog]')")
screenshot("mobile-menu-390.jpg")
for count in range(8):
    key("Tab")
    assert evaluate("document.querySelector('[role=dialog]').contains(document.activeElement)")
key("Escape")
assert not evaluate("!!document.querySelector('[role=dialog]')")
assert evaluate("document.activeElement.getAttribute('aria-label')") == "Open navigation"
click("Open navigation")
click("About", "link")
time.sleep(.5)
assert evaluate("location.pathname") == "/about"
assert not evaluate("!!document.querySelector('[role=dialog]')")
results["interactions"].append("Mobile menu: focus trap, Escape, focus return, link closes menu")

navigate("/")
click("Copy project brief")
assert evaluate("document.querySelectorAll('[aria-invalid=true]').length") == 3
fill("Your name", "Morgan Lee")
fill("Email address", "morgan@example.com")
fill("Your project", "A compact courtyard home with a shaded garden.")
reference_file = (artifact_dir / "reference-plan.pdf").resolve()
reference_file.write_bytes(b"%PDF-1.4\n%%EOF")
root = cdp("DOM.getDocument", session_id=session)["root"]["nodeId"]
file_node = cdp("DOM.querySelector", session_id=session, nodeId=root, selector="#brief-file")["nodeId"]
invalid_file = (artifact_dir / "invalid-reference.exe").resolve()
invalid_file.write_bytes(b"Not an executable")
cdp("DOM.setFileInputFiles", session_id=session, nodeId=file_node, files=[str(invalid_file)])
time.sleep(.3)
assert evaluate("!!document.querySelector('#file-error')")
evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copiedBrief=text}}})")
click("Copy project brief")
assert "Brief copied" in evaluate("document.querySelector('.form-status').innerText")
assert not evaluate("!!document.querySelector('#file-error')")
assert "invalid-reference.exe" not in evaluate("window.__copiedBrief")
cdp("DOM.setFileInputFiles", session_id=session, nodeId=file_node, files=[str(reference_file)])
time.sleep(.3)
assert evaluate("!!document.querySelector('.file-row')")
evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copiedBrief=text}}})")
click("Copy project brief")
assert "Brief copied" in evaluate("document.querySelector('.form-status').innerText")
assert "reference-plan.pdf" in evaluate("window.__copiedBrief")
evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('Unavailable')}}})")
click("Copy project brief")
assert evaluate("!!document.querySelector('#prepared-brief')")
assert "Morgan Lee" in evaluate("document.querySelector('#prepared-brief').value")
click("Remove reference file")
assert not evaluate("!!document.querySelector('.file-row')")
assert evaluate("document.querySelector('#brief-message').value") == "A compact courtyard home with a shaded garden."
results["interactions"].append("Contact: validation, invalid-file rejection, local attachment selection/removal, copy success and fallback, values preserved")
screenshot("contact-interactions-390.jpg")

navigate("/")
cdp("Input.dispatchMouseEvent", session_id=session, type="mouseMoved", x=10, y=10)
heading_before = evaluate("document.querySelector('h1').innerText")
time.sleep(6.5)
assert evaluate("document.querySelector('h1').innerText") != heading_before
click("Pause slideshow")
cdp("Input.dispatchMouseEvent", session_id=session, type="mouseMoved", x=10, y=10)
heading_before = evaluate("document.querySelector('h1').innerText")
time.sleep(6.5)
assert evaluate("document.querySelector('h1').innerText") == heading_before
click("Play slideshow")
cdp("Input.dispatchMouseEvent", session_id=session, type="mouseMoved", x=10, y=10)
time.sleep(6.5)
assert evaluate("document.querySelector('h1').innerText") != heading_before
results["interactions"].append("Hero: six-second autoplay, pause and play")

cdp("Emulation.setEmulatedMedia", session_id=session, features=[{"name": "prefers-reduced-motion", "value": "reduce"}])
navigate("/")
assert not evaluate("!!document.querySelector('.pause-button')")
heading_before = evaluate("document.querySelector('h1').innerText")
time.sleep(6.4)
assert evaluate("document.querySelector('h1').innerText") == heading_before
results["interactions"].append("Reduced motion: no autoplay or pause control")
cdp("Emulation.setEmulatedMedia", session_id=session, features=[])
viewport(1440)
navigate("/")
evaluate("scrollTo({top:0,behavior:'instant'})")
screenshot("final-home-1440.jpg")
events = drain_events()
results["errors"] = [event for event in events if event.get("method") == "Runtime.exceptionThrown"]
assert not results["errors"], results["errors"]
(artifact_dir / "browser-check.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
print(json.dumps({"viewports": len(results["viewports"]), "routes": len(results["routes"]), "interactions": results["interactions"], "errors": results["errors"]}, indent=2))
