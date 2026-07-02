#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CASES="$ROOT/public/cases"

crop_center() {
  local input="$1"
  local output="$2"
  local crop_h="$3"
  local crop_w="$4"
  sips -c "$crop_h" "$crop_w" "$input" --out "$output" >/dev/null
}

to_jpeg() {
  local input="$1"
  local output="$2"
  sips -s format jpeg "$input" --out "$output" >/dev/null
}

make_variants() {
  local input="$1"
  local base="$2"
  local width height
  local tmp="${base}.tmp.jpg"

  width=$(sips -g pixelWidth "$input" | awk '/pixelWidth/ {print $2}')
  height=$(sips -g pixelHeight "$input" | awk '/pixelHeight/ {print $2}')

  to_jpeg "$input" "$tmp"

  crop_center "$tmp" "${base}--16-10.jpg" "$(( width * 10 / 16 ))" "$width"
  crop_center "$tmp" "${base}--16-9.jpg" "$(( width * 9 / 16 ))" "$width"
  crop_center "$tmp" "${base}--5-6.jpg" "$height" "$(( height * 5 / 6 ))"
  crop_center "$tmp" "${base}--6-7.jpg" "$height" "$(( height * 6 / 7 ))"

  sips -Z 1920 "${base}--16-10.jpg" >/dev/null
  sips -Z 1920 "${base}--16-9.jpg" >/dev/null
  sips -Z 1600 "${base}--5-6.jpg" >/dev/null
  sips -Z 1400 "${base}--6-7.jpg" >/dev/null

  rm -f "$tmp"
}

for file in \
  "$CASES/nordwear/mobile.webp" \
  "$CASES/nordwear/mobile2.png" \
  "$CASES/nordwear/category.webp" \
  "$CASES/nordwear/production.webp" \
  "$CASES/nordwear/cart.webp" \
  "$CASES/fresh-cut/mobile1.webp" \
  "$CASES/fresh-cut/mobile2.webp" \
  "$CASES/fresh-cut/thumbnail.webp" \
  "$CASES/visuel-atelier/hero.webp"
do
  if [[ ! -f "$file" ]]; then
    echo "Skip missing: $file"
    continue
  fi

  base="${file%.*}"
  echo "Processing $file"
  make_variants "$file" "$base"
done

echo "Done."
