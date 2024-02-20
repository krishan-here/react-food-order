import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [hasEdit, setHasEdit] = useState(false);

  const isInvalid = validationFn && !validationFn(enteredValue);

  function handleInputChange(value) {
    setEnteredValue(value);
    setHasEdit(false);
  }

  function handleHasEdit() {
    setHasEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleHasEdit,
    isInvalid: hasEdit && isInvalid,
  };
}
