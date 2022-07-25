import { DarkMode } from "@mui/icons-material";
import { Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType=== 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
  setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline></CssBaseline>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}></Header>
      <Container>
      <Catalog/>
      </Container>
    </ThemeProvider>
  );
}

export default App;