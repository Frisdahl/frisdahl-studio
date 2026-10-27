import { useId, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'

/**
 * "What I can offer": numbered service rows on the left that work as an
 * accordion (one always open, its text revealed below the heading) and an
 * image on the right that crossfades to the open row's image.
 */
export function AddedValueSection() {
  const { locale } = useLocale()
  const { addedValue } = getHomeContent(locale)
  const [activeIndex, setActiveIndex] = useState(0)
  const baseId = useId()

  return (
    <section className="added-value" aria-label={addedValue.ariaLabel}>
      <div className="added-value-inner">
        <div className="added-value-list-col">
          <h2 className="added-value-eyebrow">
            <span className="added-value-dot" aria-hidden="true" />
            {addedValue.eyebrow}
          </h2>

          <ol className="added-value-list">
            {addedValue.items.map((item, index) => {
              const isActive = index === activeIndex
              const panelId = `${baseId}-panel-${index}`
              const buttonId = `${baseId}-button-${index}`

              return (
                <li key={item.title} className={`added-value-item${isActive ? ' is-active' : ''}`}>
                  <h3 className="added-value-item-heading">
                    <button
                      id={buttonId}
                      type="button"
                      className="added-value-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className="added-value-number">({String(index + 1).padStart(2, '0')})</span>
                      <span className="added-value-title">{item.title}</span>
                    </button>
                  </h3>

                  {/* Always rendered so the height can animate (grid 0fr → 1fr);
                      inert keeps a closed panel out of reach while collapsed. */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="added-value-panel"
                    inert={!isActive}
                  >
                    <div className="added-value-panel-inner">
                      <p className="added-value-text">{item.text}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="added-value-media">
          {addedValue.items.map((item, index) => (
            <img
              key={item.imageSrc}
              {...responsiveImageProps(item.imageSrc, IMAGE_SIZES.halfFromDesktop)}
              alt={index === activeIndex ? item.imageAlt : ''}
              aria-hidden={index === activeIndex ? undefined : true}
              className={`added-value-image${index === activeIndex ? ' is-active' : ''}`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
