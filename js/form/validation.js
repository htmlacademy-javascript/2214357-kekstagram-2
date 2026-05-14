const MAX_QUATITY = 5;
const MAX_QUANTITY_SIMBOL = 140;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

let errorMessage = '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateForm = () => pristine.validate();

const checkRules = [
  {
    check: (inputsArray) => inputsArray.some((element) => !/^#[a-zа-яё1-9]{1,19}$/i.test(element)),
    error: 'Не допустимые символы!'
  },
  {
    check: (inputsArray) => inputsArray.length > MAX_QUATITY,
    error: `Не более ${MAX_QUATITY} хэштегов!`
  },
  {
    check: (inputsArray) => inputsArray.some((element, num, elementsArray) => elementsArray.includes(element, num + 1)),
    error: 'Хэштэги не должны повторяться!'
  },
];

const validateHashtags = (value) => {
  const inputText = value.toLowerCase().trim();
  const inputArray = inputText.split(' ');

  if(inputText.length === 0){
    return true;
  }

  const checks = checkRules.every((ruleValidate) => {
    const isInvalid = ruleValidate.check(inputArray);

    if(isInvalid) {
      errorMessage = ruleValidate.error;
    }

    return !isInvalid;
  });

  return checks;
};

const validateDescription = (value) => {
  const inputCommentsArray = value;
  inputCommentsArray.split(' ');

  const isInvalid = inputCommentsArray.length > MAX_QUANTITY_SIMBOL;

  if (isInvalid){
    errorMessage = `Не более ${MAX_QUANTITY_SIMBOL} символов!`;
  }

  return !isInvalid;
};

const initValidation = () => {
  pristine.addValidator(hashtagsInput, validateHashtags, () => errorMessage);
  pristine.addValidator(descriptionInput, validateDescription, () => errorMessage);
};

export { initValidation, validateForm };
