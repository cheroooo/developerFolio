import React, {useEffect, useState} from "react";
import Header from "../components/header/Header";
import {Switch, Route} from "react-router-dom";
import Home from "./Home/Home";
import ProgramManagement from "./ProgramManagement/ProgramManagement";
import HrOperations from "./HrOperations/HrOperations";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "./topbutton/Top";
import CoverPage from "./coverPage/CoverPage";
import FallingPetals from "../components/fallingPetals/FallingPetals";
import {splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import "./Main.scss";

const Main = () => {
  const isDark = false;
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {};

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <CoverPage />
        ) : (
          <>
            <FallingPetals />
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/program-management"
                component={ProgramManagement}
              />
              <Route exact path="/hr-operations" component={HrOperations} />
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
