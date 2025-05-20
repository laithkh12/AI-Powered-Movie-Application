import React, { createContext, useMemo, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider as LegacyThemeProvider } from "@mui/styles";

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode, setMode }}>
      <MuiThemeProvider theme={theme}>
        <LegacyThemeProvider theme={theme}>{children}</LegacyThemeProvider>
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
