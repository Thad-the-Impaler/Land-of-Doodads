#!/bin/sh
# Cut a game sound out of a recording, the way the shipped ones were cut.
#
#   tools/make_sound.sh <in> <out.mp3> <start> <end> [extra filters]
#
# start/end are seconds from the beginning of the source. Everything the
# shipped sounds have in common happens here: a high pass to take the rumble
# out, short fades so the clip cannot click, a pass to MEASURE the peak and a
# second pass to lift it to -1 dB. Peak normalisation rather than loudnorm,
# because loudnorm gates and pumps on clips this short - it turned a sequence
# of sharp knocks into one spike and a lot of nothing.
#
# The three voices in Assets/sounds were made with:
#
#   tools/make_sound.sh "Extra Sounds/Billy Select.m4a"  Assets/sounds/billyselect.mp3  0.19 1.95
#   tools/make_sound.sh "Extra Sounds/Saddam Select.m4a" Assets/sounds/saddamselect.mp3 0.19 2.27
#   tools/make_sound.sh "Extra Sounds/Chicken sounds.m4a" Assets/sounds/pepperselect.mp3 291.29 291.70 \
#       "highpass=f=320,acompressor=threshold=-30dB:ratio=4:attack=5:release=120"
#
# Pepper's is the awkward one: a yard recording with the call 24 dB down and
# the room floor right underneath it, so it gets a far higher high pass than
# the others (a hen is well above 320 Hz, the room is not) and a little
# compression to lift the call off the hiss before the gain goes on. The
# extra-filter argument replaces the default chain's high pass.
#
# After adding a file: give it a role in js/audio.js SAMPLES, name that role
# in SOUND_ROLES in tools/build_single_file.py so the single-file build
# inlines it, and rebuild.
set -e
[ $# -ge 4 ] || { sed -n '2,9p' "$0" | sed 's/^# \{0,1\}//'; exit 1; }
in=$1; out=$2; ss=$3; to=$4
pre=${5:-highpass=f=90}
dur=$(python3 -c "print(round($to - $ss, 3))")
fade=$(python3 -c "print(round($dur - 0.04, 3))")
tmp=$(mktemp -t doodadsnd).wav

ffmpeg -v error -y -ss "$ss" -to "$to" -i "$in" \
  -af "$pre,afade=t=in:st=0:d=0.012,afade=t=out:st=$fade:d=0.04" \
  -ac 1 -ar 44100 -c:a pcm_s16le "$tmp"

peak=$(ffmpeg -hide_banner -nostats -i "$tmp" -af volumedetect -f null /dev/null 2>&1 |
       sed -n 's/.*max_volume: \(-*[0-9.]*\) dB.*/\1/p')
gain=$(python3 -c "print(round(-1.0 - ($peak), 2))")

ffmpeg -v error -y -i "$tmp" -af "volume=${gain}dB" \
  -ac 1 -ar 44100 -c:a libmp3lame -q:a 5 "$out"
rm -f "$tmp"

printf '%s  %ss  peak %s dB -> %+s dB  (%s bytes)\n' \
  "$out" "$dur" "$peak" "$gain" "$(wc -c < "$out" | tr -d ' ')"
