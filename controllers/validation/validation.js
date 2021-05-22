const validateString = (input) => {
  // validate input is not empty
  if (input.length === 0) {
    return false;
  }

  // validate input is not over 256 characters
  if (input.length > 256) {
    return false;
  }

  // validate input does not contain special characters
  // source: https://stackoverflow.com/questions/11896599/javascript-code-to-check-special-characters
  const patternSpecialCharacters = new RegExp(
    /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?.]/
  );
  if (patternSpecialCharacters.test(input)) {
    return false;
  }

  // validate type of input
  if (typeof input !== "string") {
    return false;
  }

  // valid input string
  return true;
};

const validateLength = (length) => {
  // length must not contain symbol characters
  const patternSpecialCharacters = new RegExp(
    /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?.]/
  );
  if (patternSpecialCharacters.test(length)) {
    return false;
  }

  // length must not contain alphabet characters
  const patternAlpha = new RegExp(/[A-Za-z]/);
  if (patternAlpha.test(length)) {
    return false;
  }

  // length must be greater than 0
  if (length === 0) {
    return false;
  }

  // validate type of input
  if (typeof length !== "number") {
    return false;
  }

  // valid input length
  return true;
};

const validateDate = (input) => {
  // validate input is not empty
  if (input.length === 0) {
    return false;
  }

  // validate input is not over 256 characters
  if (input.length > 256) {
    return false;
  }

  // validate input matches date format
  // source: https://stackoverflow.com/questions/7388001/javascript-regex-to-validate-date-format
  const dateReg = /^\d{2}[/-]\d{2}[/-]\d{4}$/;

  if (!dateReg.test(input)) {
    return false;
  }

  // validate type of input
  if (typeof input !== "string") {
    return false;
  }

  // valid input string
  return true;
};

module.exports = { validateLength, validateString, validateDate };
