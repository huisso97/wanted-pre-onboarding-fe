import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Theme } from "./styles/theme";
function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
