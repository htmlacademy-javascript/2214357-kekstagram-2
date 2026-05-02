import { SLIDER_EFFECT_OPTIONS } from './slider-options';

const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.img-upload__effects');
const sliderEffectValue = document.querySelector('.effect-level__value');

let currentEffect = 'none';

const updateSliderEffect = (effect) => {
  if(effect === 'none') {
    sliderContainer.style.display = 'none';
    imagePreview.removeAttribute('style');

    return;
  }

  sliderContainer.style.display = 'block';

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    sliderEffectValue.value = sliderValue;

    const configSlider = SLIDER_EFFECT_OPTIONS[currentEffect];
    if (currentEffect !== 'none') {
      imagePreview.style.filter = `${configSlider.filter}(${sliderValue}${configSlider.measure})`;
    }
  });
};

const changeSliderOptions = () => {
  const configSlider = SLIDER_EFFECT_OPTIONS[currentEffect];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: configSlider.min,
      max: configSlider.max
    },
    start: configSlider.max,
    step: configSlider.step,
    measure: configSlider.measure,
  });

  updateSliderEffect(currentEffect);
};

const initEffect = () => {
  noUiSlider.create(sliderElement, {
    connect: 'lower',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 0.1,
  });

  updateSliderEffect('none');
};

effectList.addEventListener('change', (evt) => {
  if(evt.target.matches('.effects__radio')) {
    currentEffect = evt.target.value;
  }

  changeSliderOptions();
});

const resetEffect = () => {
  sliderElement.noUiSlider.destroy(sliderElement);
  updateSliderEffect('none');
};

export { initEffect, resetEffect };
