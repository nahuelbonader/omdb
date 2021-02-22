import { useState } from "react";

function useInput(name, validate, errormsg) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleBlur = () => {
    if (!validate(value)) setError(errormsg);
    else setError("");
  };

  const handleFocus = () => setError("");

  return {
    [name]: {
      value,
      error,
    },
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
  };
}

export default useInput;
