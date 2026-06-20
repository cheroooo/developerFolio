import React, {useEffect, useState} from "react";
import {Switch, Route, useLocation} from "react-router-dom";
import Home from "./Home/Home";
import ProgramManagement from "./ProgramManagement/ProgramManagement";
import HrOperations from "./HrOperations/HrOperations";
import AboutMe from "./aboutMe/AboutMe";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "./topbutton/Top";
import CoverPage from "./coverPage/CoverPage";
import Header from "../components/header/Header";
import {splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import "./Main.scss";

const Main = () => {
  const isDark = false;
  const isCoverTestMode =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("coverTest") === "1";
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] = useState(() => {
    if (window.location.pathname !== "/") return false;
    if (sessionStorage.getItem("splashShown") && !isCoverTestMode) return false;
    return true;
  });

  useEffect(() => {
    if (splashScreen.enabled && !isCoverTestMode) {
      const splashTimer = setTimeout(() => {
        sessionStorage.setItem("splashShown", "1");
        setIsShowingSplashAnimation(false);
      }, splashScreen.duration);
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, [isCoverTestMode]);

  const location = useLocation();
  const changeTheme = () => {};

  useEffect(() => {
    if (location.pathname === "/about") {
      document.body.classList.add("page-about");
      document.documentElement.classList.add("page-about");
    } else {
      document.body.classList.remove("page-about");
      document.documentElement.classList.remove("page-about");
    }
  }, [location.pathname]);

  const pageKey = location.pathname === "/about" ? "about" : "home";

  return (
    <div className={isDark ? "dark-mode" : null} data-page={pageKey}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <CoverPage />
        ) : (
          <>
            <Header />            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/program-management"
                component={ProgramManagement}
              />
              <Route exact path="/hr-operations" component={HrOperations} />
              <Route exact path="/about" component={AboutMe} />
            </Switch>
            <Footer />
            <ScrollToTopButton />
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
