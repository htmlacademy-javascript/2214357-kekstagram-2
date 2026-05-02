const scaleValue = document.querySelector('.scale__control--value');
const imagePrewiev = document.querySelector('.img-upload__preview img');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');

let scale = 1;
const SCALE_STEP = 0.25;

const onButtonSmallerClick = () => {
  if(scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imagePrewiev.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
};

const onButtonBiggerClick = () => {
  if(scale < 1) {
    scale += SCALE_STEP;
    imagePrewiev.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
};

const initScale = () => {
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  buttonBigger.addEventListener('click', onButtonBiggerClick);
};

const resetScale = () => {
  buttonBigger.removeEventListener('click', onButtonBiggerClick);
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
};

export { initScale, resetScale };
