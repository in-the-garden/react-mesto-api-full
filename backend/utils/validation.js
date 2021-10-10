const validator = require('validator');

module.exports.validateURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Введен некорректный URL');
};
