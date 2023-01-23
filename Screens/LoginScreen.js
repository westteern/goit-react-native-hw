import { useState } from "react";
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

export default function LoginScreen() {
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
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/photo-bg.jpg")}
        >
          <KeyboardAvoidingView
          // behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                height: isShowKeyboard ? 249 : 489,
              }}
            >
              <View>
                <Text style={styles.formTitle}>Login</Text>
                <TextInput
                  style={{
                    ...styles.inputMail,
                    borderColor: isActiveMail ? "#FF6C00" : "#E8E8E8",
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
                      ...styles.inputPass,
                      borderColor: isActivePass ? "#FF6C00" : "#E8E8E8",
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
                <View style={{ marginTop: 43 }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={onSubmit}
                  >
                    <Text style={styles.textBtn}>Log In</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 16 }}>
                  <Text style={styles.noRegisterText}>
                    Don't have an account? Register
                  </Text>
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
    height: 489,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    fontFamily: "Roboto-Regular",
  },
  inputMail: {
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
  },
  inputPass: {
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
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
    color: "#212121",
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
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
  },
});