import { brandLetters, getLetterWidth } from '../../lib/brand'

export function BrandWordmark() {
  return (
    <span className="brand-wordmark">
      <span className="brand-wordmark-inner">
        <span className="brand-wordmark-letters-wrap">
          <span className="brand-wordmark-reg" aria-hidden="true">
            ®
          </span>

          <span className="brand-wordmark-letters">
            {brandLetters.map((letter, index) => (
              <span
                key={`${letter.char}-${index}`}
                className="brand-wordmark-letter"
                style={{ maxWidth: getLetterWidth(letter.char) }}
              >
                {letter.char}
              </span>
            ))}
          </span>
        </span>
      </span>
    </span>
  )
}
