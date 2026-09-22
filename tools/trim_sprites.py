#!/usr/bin/env python3
"""Turn the full size doodad artwork into game ready frames.

Reads the paired Fall/Fly artwork out of "Assets/Doodads (Characters)",
trims the transparent border, scales both frames down together and writes
them to Assets/sprites. It then prints the sprite metadata block to paste
into js/doodads.js.

Both frames of a doodad are cropped with the SAME box, so the body does not
jump between the neutral and the flapping frame. The pivot it reports is the
centre of the body in the neutral frame, bodyR is that body's radius and
footOffset is how far below the pivot the feet reach, in body radii.

    python3 tools/trim_sprites.py

Needs Pillow:  python3 -m pip install pillow
"""

import json
import os
import sys

from PIL import Image

SRC = "Assets/Doodads (Characters)"
DST = "Assets/sprites"

# doodad id -> { frame name: source file stem }. "fall" is required: it is
# the neutral frame everything is measured from. "fly" is the flap. Anything
# else is an extra frame a doodad's ability can ask for by name, and it is
# cropped with the same box as the rest so the body never jumps.
DOODADS = {
    "cookie": {"fall": "CookFall", "fly": "CookFly"},
    "pepper": {"fall": "PeppFall", "fly": "PeppFly"},
    "gerald": {"fall": "GeraFall", "fly": "GeraFly", "eat": "GerEat"},
    "maximus": {"fall": "MaxiFall", "fly": "MaxiFly"},
    "billy": {"fall": "BillFall", "fly": "BillFly"},
    "inari": {"fall": "InarFall", "fly": "InarFly"},
}

ALPHA_FLOOR = 64   # drop the faint drop shadow and the antialiased fringe
TARGET = 384       # longest side of the exported frame, in pixels


def main():
    if not os.path.isdir(SRC):
        sys.exit("run this from the project root: %s not found" % SRC)
    os.makedirs(DST, exist_ok=True)

    cut = [0 if v < ALPHA_FLOOR else v for v in range(256)]
    meta = {}

    for key, stems in DOODADS.items():
        frames = {}
        for name, stem in stems.items():
            im = Image.open(os.path.join(SRC, stem + ".png")).convert("RGBA")
            im.putalpha(im.getchannel("A").point(cut))
            frames[name] = im

        boxes = {k: v.getchannel("A").getbbox() for k, v in frames.items()}
        fall_box = boxes["fall"]
        union = (min(b[0] for b in boxes.values()), min(b[1] for b in boxes.values()),
                 max(b[2] for b in boxes.values()), max(b[3] for b in boxes.values()))

        w, h = union[2] - union[0], union[3] - union[1]
        scale = TARGET / max(w, h)
        out_w, out_h = max(1, round(w * scale)), max(1, round(h * scale))

        for name, im in frames.items():
            # premultiply before resampling, or transparent pixels bleed a halo
            (im.crop(union)
               .convert("RGBa")
               .resize((out_w, out_h), Image.LANCZOS)
               .convert("RGBA")
               .save(os.path.join(DST, "%s_%s.png" % (key, name)), optimize=True))

        body_r = min(fall_box[2] - fall_box[0], fall_box[3] - fall_box[1]) / 2 * scale
        pivot_y = ((fall_box[1] + fall_box[3]) / 2 - union[1]) * scale
        meta[key] = {
            "w": out_w,
            "h": out_h,
            "pivotX": round(((fall_box[0] + fall_box[2]) / 2 - union[0]) * scale, 1),
            "pivotY": round(pivot_y, 1),
            "bodyR": round(body_r, 1),
            "footOffset": round(((fall_box[3] - union[1]) * scale - pivot_y) / body_r, 2),
        }
        print("%-8s %4dx%-4d  %-22s -> %s"
              % (key, out_w, out_h, "+".join(sorted(frames)), DST))

    print("\npaste into js/doodads.js:\n")
    for key, m in meta.items():
        print("  %s: sprite: %s," % (key, json.dumps(m)))


if __name__ == "__main__":
    main()
