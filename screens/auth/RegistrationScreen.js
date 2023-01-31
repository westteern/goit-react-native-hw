import { AntDesign } from "@expo/vector-icons";
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
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";

const imageBg = require("../../assets/images/photo-bg.jpg");
const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [state, setState] = useState(initialState);
  const [isSecurity, setIsSecurity] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isActiveLogin, setIsActiveLogin] = useState(false);
  const [isActiveMail, setIsActiveMail] = useState(false);
  const [isActivePass, setIsActivePass] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      console.log(avatar);
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const onSubmit = () => {
    console.log(state, avatar);
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
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={imageBg}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 10 : 78,
              }}
            >
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
                      <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                    </View>
                  </Pressable>
                )}
              </View>
              <Text style={styles.formTitle}>Registration</Text>
              <View width="100%">
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isActiveLogin ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isActiveLogin ? "#FFFFFF" : "#F6F6F6",
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
                    ...styles.input,
                    marginTop: 16,
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
                  <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.noRegisterText}>
                      Don't have an account? Log In
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
    position: "relative",
    paddingHorizontal: 16,
    // width: "100%",
    // height: 549,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    flexDirection: "row",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    alignItems: "flex-end",
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
    marginTop: 92,
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
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
  },
});
