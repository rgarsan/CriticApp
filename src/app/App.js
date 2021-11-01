import { GlobalStyles, ThemeProvider } from "@material-ui/core";
import AppMain from "../containers/main/main";
import { CRITIC_THEME } from "./themes/themes";
import { BrowserRouter as Router } from "react-router-dom";
import { CriticStoreProvider } from "./store/store";

function App() {
  return (
    <ThemeProvider theme={CRITIC_THEME}>
      <CriticStoreProvider>
        <Router>
          <AppMain />
          <GlobalStyles />
        </Router>
      </CriticStoreProvider>
    </ThemeProvider>
  );
}

export default App;
