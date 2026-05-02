const SLIDER_EFFECT_OPTIONS = {
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    measure: '',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 100,
    measure: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    measure: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    measure: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    measure: '',
  },
};

export { SLIDER_EFFECT_OPTIONS };
