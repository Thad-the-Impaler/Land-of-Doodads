#!/usr/bin/env python3
"""Bundle the game into one self-contained HTML file.

Chrome refuses to let a file:// page load the scripts and images sitting next
to it (every file:// url is its own origin), so double-clicking index.html
gives you a blank page. This inlines the stylesheet, every script, all the
character frames and the sounds as data uris, producing a single file that
opens anywhere - straight off the desktop, from a usb stick, as an email
attachment.

    python3 tools/build_single_file.py

Re-run it after changing anything under js/, css/, Assets/sprites/ or
Assets/sounds/.
"""

import base64
import os
import re
import sys

OUT = "Land of Doodads.html"

# A sound file is named for what it IS, so that it stays identifiable; audio.js
# plays it under the name of what it DOES. This is the one place the two meet,
# and a file with no entry keeps its own stem as its role.
SOUND_ROLES = {"mkoydokoy.mp3": "unlock", "stressless.mp3": "nerve",
               "wholenewworld.mp3": "room",
               # the doodads' own calls on the character select; js/doodads.js
               # names the role in each doodad's `voice` field
               "cookieselect.mp3": "voiceCookie",
               "pepperselect.mp3": "voicePepper",
               "billyselect.mp3": "voiceBilly",
               "saddamselect.mp3": "voiceSaddam"}


def read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def data_uri(path, mime="image/png"):
    with open(path, "rb") as fh:
        return "data:%s;base64,%s" % (mime, base64.b64encode(fh.read()).decode("ascii"))


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
    frames = "\n".join('  "%s": "%s",' % (k, v) for k, v in sprites.items())

    # the sounds, keyed by the ROLE js/audio.js plays them under rather than
    # by filename - audio.js maps role -> path and this overrides the path
    sounds = {}
    if os.path.isdir("Assets/sounds"):
        for name in sorted(os.listdir("Assets/sounds")):
            if name.endswith(".mp3"):
                sounds[SOUND_ROLES.get(name, name[:-4])] = data_uri(
                    os.path.join("Assets/sounds", name), "audio/mpeg")
    # the key is QUOTED: these are role names, and a role with a dot or a
    # dash in it would otherwise emit a syntax error into the shipped page
    # rather than failing here where somebody would see it
    clips = "\n".join('  "%s": "%s",' % (k, v) for k, v in sounds.items())

    inline_assets = ("<script>\nwindow.DOODAD_SPRITES = {\n" + frames + "\n};\n"
                     "window.DOODAD_SOUNDS = {\n" + clips + "\n};\n</script>")

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

    print("%s  (%.0f KB, %d scripts, %d sprite frames, %d sounds)"
          % (OUT, os.path.getsize(OUT) / 1024, len(scripts), len(sprites), len(sounds)))


if __name__ == "__main__":
    main()
