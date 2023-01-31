import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
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

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={imageBg}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View style={styles.form}>
            <View style={styles.avatar}>
              <Image source={{ uri: avatar }} style={styles.avatarImg} />
              {avatar ? (
                <Pressable
                  onPress={() => {
                    setAvatar(null);
                  }}
                >
                  <View style={styles.removeAvatarIcon}>
                    <AntDesign name="closecircleo" size={25} color="#E8E8E8" />
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
            <Pressable
              onPress={() => navigation.navigate("Login")}
              title="LogOut"
              style={styles.logOutIcon}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
            <Text style={styles.formTitle}>User Name</Text>
            <View width="100%"></View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
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
    width: "100%",
    height: 549,
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
  formTitle: {
    marginBottom: 32,
    marginTop: 48,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
  logOutIcon: {
    marginTop: 24,
    alignSelf: "flex-end",
  },
});
