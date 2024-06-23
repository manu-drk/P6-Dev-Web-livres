import passwordValidator from 'password-validator';

const schema = new passwordValidator();

schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces();

export const validatePassword = (password) => {
  const validationResult = { error: false, message: '' };

  if (!schema.validate(password)) {
    validationResult.error = true;
    validationResult.message = 'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et ne doit pas contenir d\'espaces.';
  }

  return validationResult;
};
