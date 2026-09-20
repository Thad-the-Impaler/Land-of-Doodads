#!/usr/bin/env python3
"""Bundle the game into one self-contained HTML file.

Chrome refuses to let a file:// page load the scripts and images sitting next
to it (every file:// url is its own origin), so double-clicking index.html
gives you a blank page. This inlines the stylesheet, every script and all the
character frames as data uris, producing a single file that opens anywhere -
straight off the desktop, from a usb stick, as an email attachment.

    python3 tools/build_single_file.py

Re-run it after changing anything under js/, css/ or Assets/sprites/.
"""

import base64
import os
import re
import sys

OUT = "Land of Doodads.html"


def read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def data_uri(path):
    with open(path, "rb") as fh:
        return "data:image/png;base64," + base64.b64encode(fh.read()).decode("ascii")


def main():
    if not os.path.isfile("index.html"):
        sys.exit("run this from the project root")

    html = read("index.html")

    # the stylesheet
    css = read("css/style.css")
    html = re.sub(r'\s*<link rel="stylesheet"[^>]*>',
                  "\n<style>\n" + css + "</style>", html)

    # the character frames, keyed exactly as js/assets.js expects them
    sprites = {}
    for name in sorted(os.listdir("Assets/sprites")):
        if name.endswith(".png"):
            sprites[name[:-4]] = data_uri(os.path.join("Assets/sprites", name))
    frames = "\n".join('  %s: "%s",' % (k, v) for k, v in sprites.items())
    inline_assets = "<script>\nwindow.DOODAD_SPRITES = {\n" + frames + "\n};\n</script>"

    # every script tag, in the order index.html lists them
    scripts = re.findall(r'<script src="([^"]+)"></script>', html)
    if not scripts:
        sys.exit("no scripts found in index.html - has its markup changed?")

    bundle = [inline_assets]
    for src in scripts:
        code = read(src)
        if "</script" in code:
            sys.exit("%s contains a literal </script and cannot be inlined" % src)
        bundle.append("<script>\n/* ---- %s ---- */\n%s</script>" % (src, code))

    first = '<script src="%s"></script>' % scripts[0]
    html = html.replace(first, "\n".join(bundle))
    for src in scripts[1:]:
        html = html.replace('  <script src="%s"></script>\n' % src, "")

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(html)

    print("%s  (%.0f KB, %d scripts, %d sprite frames)"
          % (OUT, os.path.getsize(OUT) / 1024, len(scripts), len(sprites)))


if __name__ == "__main__":
    main()
