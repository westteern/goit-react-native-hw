import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isSecurity, setIsSecurity] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isActiveMail, setIsActiveMail] = useState(false);
  const [isActivePass, setIsActivePass] = useState(false);

  const keboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const onSubmit = () => {
    console.log(state);
    navigation.navigate("Home");
    setState(initialState);
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/photo-bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 144,
              }}
            >
              <View>
                <Text style={styles.formTitle}>Login</Text>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isActiveMail ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isActiveMail ? "#FFFFFF" : "#F6F6F6",
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsActiveMail(true);
                  }}
                  onBlur={() => setIsActiveMail(false)}
                  placeholder={"Email"}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
                <View style={{ marginTop: 16, position: "relative" }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isActivePass ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isActivePass ? "#FFFFFF" : "#F6F6F6",
                    }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsActivePass(true);
                    }}
                    onBlur={() => setIsActivePass(false)}
                    placeholder={"Password"}
                    secureTextEntry={isSecurity}
                    maxLength={20}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Pressable
                    onPress={() => {
                      setIsSecurity((prev) => !prev);
                    }}
                    style={styles.toggleShowPass}
                  >
                    <Text style={styles.toggleShowPassText}>
                      {isSecurity ? "Show" : "Hide"}
                    </Text>
                  </Pressable>
                </View>

                <View style={{ display: isShowKeyboard ? "none" : "flex" }}>
                  <View style={{ marginTop: 43 }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.btn}
                      onPress={onSubmit}
                    >
                      <Text style={styles.textBtn}>Log In</Text>
                    </TouchableOpacity>
                  </View>
                  <Pressable onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.noRegisterText}>
                      Don't have an account? Register
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    fontFamily: "Roboto-Regular",
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  toggleShowPass: {
    position: "absolute",
    top: 50 / 2 / 2,
    right: 16,
  },
  toggleShowPassText: {
    color: "#1B4371",
    fontSize: 16,
  },
  formTitle: {
    marginBottom: 32,
    marginTop: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121CC",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textBtn: {
    padding: 16,
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
  },
  noRegisterText: {
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
  },
});
