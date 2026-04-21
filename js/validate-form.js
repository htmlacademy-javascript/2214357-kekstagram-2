const MAX_QUATITY = 5;

let errorMessage = '';

const errorText = () => errorMessage;

function validHashtags (value) {
  const inputText = value.toLowerCase().trim();
  const inputArray = inputText.split(' ');

  if(inputText.length === 0){
    return true;
  }

  const checksArray = [
    {
      check: inputArray.some((element) => !/^#[a-zа-яё1-9]{1,19}$/i.test(element)),
      error: 'Не допустимые символы!'
    },
    {
      check: inputArray.length > MAX_QUATITY,
      error: `Не более ${MAX_QUATITY} хэштегов!`
    },
    {
      check: inputArray.some((element, num, Array) => Array.includes(element, num + 1)),
      error: 'Хэштэги не должны повторяться!'
    },
  ];

  const checks = checksArray.every((elem) => {
    const isInvalid = elem.check;
    if(isInvalid) {
      errorMessage = elem.error;
    }
    return(!isInvalid);
  });

  return checks;
}

function validComment (value) {
  const inputCommentArray = value;
  inputCommentArray.split(' ');

  const isInvalid = inputCommentArray.length > 140;
  if (isInvalid){
    errorMessage = 'Не более 140 символов!';
  }
  return (!isInvalid);
}

export { errorText, validHashtags, validComment};
