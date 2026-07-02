export const FEATURE_STEP_TRANSITION = {
  duration: 0.75,
  ease: [0.86, 0, 0.07, 1] as [number, number, number, number],
}

export const FEATURE_STEP_INDICATOR_TRANSITION = {
  duration: 0.75,
  ease: [0.36, 0, 0.66, -0.56] as [number, number, number, number],
}

export const FEATURE_STEP_OUTDENT = '-0.375rem'

export const FEATURE_STEP_INDENT = '1.25rem'

export const FEATURE_STEP_INACTIVE_OPACITY = 0.42

export const FEATURE_STEP_ROTATION = 90

/** Extra scroll at the end of the feature section so the last step stays visible longer. */
export const FEATURE_SCROLL_END_HOLD_RATIO = 0.28

export type FeatureImageDirection = 1 | -1

export const FEATURE_IMAGE_VARIANTS = {
  enter: (direction: FeatureImageDirection) => ({
    y: direction === 1 ? '100%' : '-100%',
    zIndex: 2,
  }),
  center: {
    y: 0,
    zIndex: 1,
  },
  exit: (direction: FeatureImageDirection) => ({
    y: direction === 1 ? '-100%' : '100%',
    zIndex: 1,
  }),
}
