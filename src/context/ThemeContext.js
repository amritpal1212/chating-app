import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: isDarkMode ? "#2B2D42" : "#FFFFFF",
      secondary: isDarkMode ? "#1A1B26" : "#F0F2F5",
      text: isDarkMode ? "#E2E8F0" : "#1A202C",
      accent: isDarkMode ? "#8B5CF6" : "#4A90E2",
      messageSent: isDarkMode ? "#8B5CF6" : "#0084FF",
      messageReceived: isDarkMode ? "#2D3748" : "#E9ECEF",
      inputBg: isDarkMode ? "#2D3748" : "#E0E0E0",
      border: isDarkMode ? "#4A5568" : "#E2E8F0",
      hover: isDarkMode ? "#4A5568" : "#E2E8F0",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 