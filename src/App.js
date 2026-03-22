import React from "react";
import "./App.scss";
import Main from "./containers/Main";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Main />
    </BrowserRouter>
  );
}

export default App;
