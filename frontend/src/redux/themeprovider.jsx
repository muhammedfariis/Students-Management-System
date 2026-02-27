import { useSelector } from "react-redux";
import { useEffect } from "react";

const ThemeProvider = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return children;
};

export default ThemeProvider;