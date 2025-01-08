import { useEffect, useRef, useState } from "react";
import useInput from "./useInput";

const useToggle = () => {
  // state
  const [toggle, setToggle] = useState(false);
  const toggleRef = useRef();

  // toggle feature
  const handleToggle = () => {
    setToggle(true);
  };

  // toggle close
  const handleToggleClose = (e) => {
    if (
      (toggleRef.current && !toggleRef.current.contains(e.target)) ||
      e.target.classList.contains("toggle-close")
    ) {
      setToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleToggleClose);

    return () => {
      document.removeEventListener("click", handleToggleClose);
    };
  }, []);

  return { toggle, setToggle, handleToggle, toggleRef };
};

export default useToggle;
