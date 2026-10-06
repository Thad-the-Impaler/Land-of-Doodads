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
    "saddam": {"fall": "SaddFall", "fly": "SaddFly"},
    "turd": {"fall": "TurdFall", "fly": "TurdFly"},
    "koa": {"fall": "KoaFall", "fly": "KoaFly"},
    "roller": {"fall": "RollFall", "fly": "RollFly"},
    "donkey": {"fall": "DonkFall", "fly": "DonkFly"},
    "capybara": {"fall": "CapyFall", "fly": "CapyFly"},
    "teef": {"fall": "TeefFall", "fly": "TeefFly"},
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


# THE CUPMEN, for THE FORT (js/fort.js). They are not doodads - no fall/fly
# pair, no bodyR - so they get their own table and their own pass. Every
# file is cropped to its own opaque box and scaled by ONE shared factor, so
# a gun and the cup holding it keep the size relationship they were painted
# at, and the King is taller than the rest by exactly his crown.
# For a gun the pass also measures the MUZZLE (the centre of the right-hand
# face of the barrel, where a pellet leaves) and the GRIP (the middle of the
# bottom of the handle, where a cup holds it), both in output pixels.
FOE_SRC = os.path.join(SRC, "Cupmen")
FOES = {
    "cup_crimson": "CrimCup", "gun_crimson": "CrimGun",
    "cup_green": "GreeCup", "gun_green": "GreeGun_",
    "cup_silver": "SilvCup", "gun_silver": "SilvGun",
    "cup_gold": "GoldCup_", "gun_gold": "GoldGun",
    "cup_king": "KingCup", "gun_king": "KingGun",
}
FOE_SCALE = 0.25


def gun_points(im):
    a = im.getchannel("A")
    w, h = im.size
    px = a.load()
    # muzzle: the rightmost column with any ink, and the middle of its run
    for x in range(w - 1, -1, -1):
        ys = [y for y in range(h) if px[x, y] > 128]
        if ys:
            mx, my = x, (min(ys) + max(ys)) / 2
            break
    # grip: the lowest row with ink, and the middle of its run
    for y in range(h - 1, -1, -1):
        xs = [x for x in range(w) if px[x, y] > 128]
        if xs:
            gx, gy = (min(xs) + max(xs)) / 2, y
            break
    return {"muzzleX": round(mx, 1), "muzzleY": round(my, 1),
            "gripX": round(gx, 1), "gripY": round(gy, 1)}


def foes():
    cut = [0 if v < ALPHA_FLOOR else v for v in range(256)]
    meta = {}
    for key, stem in FOES.items():
        im = Image.open(os.path.join(FOE_SRC, stem + ".png")).convert("RGBA")
        im.putalpha(im.getchannel("A").point(cut))
        box = im.getchannel("A").getbbox()
        w, h = box[2] - box[0], box[3] - box[1]
        out_w, out_h = max(1, round(w * FOE_SCALE)), max(1, round(h * FOE_SCALE))
        out = (im.crop(box).convert("RGBa")
                 .resize((out_w, out_h), Image.LANCZOS).convert("RGBA"))
        out.save(os.path.join(DST, key + ".png"), optimize=True)
        m = {"w": out_w, "h": out_h}
        if key.startswith("gun_"):
            m.update(gun_points(out))
        meta[key] = m
        print("%-12s %4dx%-4d -> %s" % (key, out_w, out_h, DST))
    print("\nfoe sprite metadata (js/fort.js):\n")
    for key, m in meta.items():
        print("  %s: %s," % (key, json.dumps(m)))


if __name__ == "__main__":
    main()
    foes()
