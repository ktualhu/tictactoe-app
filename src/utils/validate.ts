export const validateTextField = (text: string) => {
  let valid = {
    isValid: false,
    reason: '',
  };
  if (text.length < 5) {
    valid.isValid = false;
    valid.reason = 'Username should have atleast 5 letters.';
  }

  if (text.length >= 5) {
    valid.isValid = true;
    valid.reason = 'OK.';
  }
  return valid;
};
