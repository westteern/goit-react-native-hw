import * as Font from "expo-font";

import { useState, useEffect } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Main from "./src/components/Main";

SplashScreen.preventAutoHideAsync();

const fonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
};

export default function App() {
  const [fontsIsReady, setFontsIsReady] = useState(false);

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
  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
      <Toast position="top" topOffset={100} />
    </>
  );
}
