import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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
  Image,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isSecurity, setIsSecurity] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isActiveLogin, setIsActiveLogin] = useState(false);
  const [isActiveMail, setIsActiveMail] = useState(false);
  const [isActivePass, setIsActivePass] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const onSubmit = () => {
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
                height: isShowKeyboard ? 369 : 549,
              }}
            >
              <View>
                <View style={styles.avatar}>
                  <Image source={{ uri: avatar }} style={styles.avatarImg} />
                  {avatar ? (
                    <Pressable
                      onPress={() => {
                        setAvatar(null);
                      }}
                    >
                      <View style={styles.removeAvatarIcon}>
                        <AntDesign
                          name="closecircleo"
                          size={25}
                          color="#E8E8E8"
                        />
                      </View>
                    </Pressable>
                  ) : (
                    <Pressable onPress={pickImage}>
                      <View style={styles.addAvatarIcon}>
                        <AntDesign
                          name="pluscircleo"
                          size={25}
                          color="#FF6C00"
                        />
                      </View>
                    </Pressable>
                  )}
                </View>
                <Text style={styles.formTitle}>Registration</Text>
                <TextInput
                  style={{
                    ...styles.inputLogin,
                    borderColor: isActiveLogin ? "#FF6C00" : "#E8E8E8",
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsActiveLogin(true);
                  }}
                  onBlur={() => setIsActiveLogin(false)}
                  placeholder={"Login"}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                />
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
                    Don't have an account? Log In
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
    height: 549,
    position: "relative",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    fontFamily: "Roboto-Regular",
  },
  avatar: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addAvatarIcon: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
  removeAvatarIcon: {
    position: "absolute",
    right: -13,
    bottom: 14,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  inputLogin: {
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
  },
  inputMail: {
    height: 50,
    marginTop: 16,
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
    paddingBottom: 32,
    paddingTop: 92,
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
