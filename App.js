import * as Font from "expo-font";

import { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import * as SplashScreen from "expo-splash-screen";

import { useRoute } from "./router";

SplashScreen.preventAutoHideAsync();

const fonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
};

export default function App() {
  const [fontsIsReady, setFontsIsReady] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);
  const routing = useRoute();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(fonts);
        SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!fontsIsReady) {
    return null;
  }
  return <NavigationContainer>{routing}</NavigationContainer>;
}
