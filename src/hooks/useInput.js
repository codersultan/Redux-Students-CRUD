import { useState } from "react";

/**
 * Form data manage hook
 * @param {*} data
 * @returns
 */
const useInput = (data) => {
  // state
  const [input, setInput] = useState(data);

  // onChange input field
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return { input, setInput, handleInputChange };
};

export default useInput;
