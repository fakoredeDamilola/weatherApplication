import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
