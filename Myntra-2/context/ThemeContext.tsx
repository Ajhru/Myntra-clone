import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme(); // device theme
  const [theme, setTheme] = useState<ThemeType>("light");

  // 🔹 Load theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("APP_THEME");

      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else {
        setTheme(systemTheme === "dark" ? "dark" : "light");
      }
    };

    loadTheme();
  }, []);

  // 🔹 Save theme whenever it changes
  useEffect(() => {
    AsyncStorage.setItem("APP_THEME", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);