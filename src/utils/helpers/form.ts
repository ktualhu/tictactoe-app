import React from 'react';
import { validateTextField } from '../../utils/validate';

export const useFormField = (initValue: string = '', valid = false) => {
  const [value, setValue] = React.useState(initValue);
  const [isValid, setValid] = React.useState(valid);
  const [isInvalid, setInvalid] = React.useState(true);
  const onChange = React.useCallback(e => {
    setValue(e.target.value);
    setValid(validateTextField(e.target.value).isValid);
    setInvalid(!validateTextField(e.target.value).isValid);
  }, []);

  return {
    value,
    isValid,
    isInvalid,
    onChange,
  };
};
