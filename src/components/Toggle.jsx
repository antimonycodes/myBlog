import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
const Toggle = ({ toggleDarkModes }) => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };
  return (
    <DarkModeSwitch
      //   style={{ marginBottom: "2rem" }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={20}
    />
  );
};

export default Toggle;
