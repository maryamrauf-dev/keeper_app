import { createTheme } from "@mui/material/styles";

const headingGold = "#8a6200";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fbbc04",
      dark: "#e2a900",
      light: "#fff3c4",
      contrastText: "#202820",
    },
    secondary: {
      main: "#d99f00",
      dark: headingGold,
      contrastText: "#202820",
    },
    background: {
      default: "#faf9f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#202820",
      secondary: "#6c6a62",
    },
    divider: "#e8e4d8",
  },
  typography: {
    fontFamily: '"Aptos", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Georgia", serif', color: headingGold },
    h2: { fontFamily: '"Georgia", serif', color: headingGold },
    h3: { fontFamily: '"Georgia", serif', color: headingGold },
    h4: { fontFamily: '"Georgia", serif', color: headingGold },
    h5: { fontFamily: '"Georgia", serif', color: headingGold },
    h6: { fontFamily: '"Georgia", serif', color: headingGold },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { minWidth: 320 },
        "*, *::before, *::after": { boxSizing: "border-box" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 7, minHeight: 42 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});

export default theme;