export const BRAND_LABEL = 'Frisdahl Studio'

export interface BrandLetter {
  char: string
}

export const brandLetters: BrandLetter[] = [
  { char: 'F' },
  { char: 'R' },
  { char: 'I' },
  { char: 'S' },
  { char: 'D' },
  { char: 'A' },
  { char: 'H' },
  { char: 'L' },
  { char: ' ' },
  { char: 'S' },
  { char: 'T' },
  { char: 'U' },
  { char: 'D' },
  { char: 'I' },
  { char: 'O' },
]

export function getLetterWidth(char: string) {
  if (char === ' ') return '0.38ch'
  if (char === 'O' || char === 'o' || char === 'M' || char === 'm' || char === 'W' || char === 'w') {
    return '1.32ch'
  }
  if (char === 'I' || char === 'i' || char === 'L' || char === 'l') return '0.92ch'
  return '1.18ch'
}
