import React from "react";
import { JobBoardPage } from "./pages/JobBoardPage/JobBoardPage";
import "./utils/globals";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./utils/globals";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <JobBoardPage />
    </ThemeProvider>
  );
}

export default App;
