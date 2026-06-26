export const BRAND_LABEL = 'Frisdahl Studio'

/** 0 = full, 1 = faded (width kept), 2 = collapsed */
export type BrandPhase = 0 | 1 | 2

export const BRAND_LETTER_EASE = [0.22, 1, 0.36, 1] as const

export interface BrandLetter {
  char: string
  remove?: boolean
}

export const brandLetters: BrandLetter[] = [
  { char: 'F' },
  { char: 'R' },
  { char: 'I', remove: true },
  { char: 'S' },
  { char: 'D' },
  { char: 'A', remove: true },
  { char: 'H' },
  { char: 'L' },
  { char: ' ', remove: true },
  { char: 'S', remove: true },
  { char: 'T', remove: true },
  { char: 'U', remove: true },
  { char: 'D', remove: true },
  { char: 'I', remove: true },
  { char: 'O', remove: true },
]

export function getLetterWidth(char: string) {
  if (char === ' ') return '0.38ch'
  if (char === 'O' || char === 'o' || char === 'M' || char === 'm' || char === 'W' || char === 'w') {
    return '1.32ch'
  }
  if (char === 'I' || char === 'i' || char === 'L' || char === 'l') return '0.92ch'
  return '1.18ch'
}
