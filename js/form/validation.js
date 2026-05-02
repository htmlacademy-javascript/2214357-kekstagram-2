const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const MAX_QUATITY = 5;
const MAX_QUANTITY_SIMBOL = 140;

let errorMessage = '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const checkRules = [
  {
    check: (inputArray) => inputArray.some((element) => !/^#[a-zа-яё1-9]{1,19}$/i.test(element)),
    error: 'Не допустимые символы!'
  },
  {
    check: (inputArray) => inputArray.length > MAX_QUATITY,
    error: `Не более ${MAX_QUATITY} хэштегов!`
  },
  {
    check: (inputArray) => inputArray.some((element, num, Array) => Array.includes(element, num + 1)),
    error: 'Хэштэги не должны повторяться!'
  },
];

const validHashtags = (value) => {
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

const validDescription = (value) => {
  const inputCommentArray = value;
  inputCommentArray.split(' ');

  const isInvalid = inputCommentArray.length > MAX_QUANTITY_SIMBOL;

  if (isInvalid){
    errorMessage = `Не более ${MAX_QUANTITY_SIMBOL} символов!`;
  }

  return !isInvalid;
};

const initValidation = () => {
  pristine.addValidator(hashtagsInput, validHashtags, () => errorMessage);
  pristine.addValidator(descriptionInput, validDescription, () => errorMessage);
};

export { initValidation };
