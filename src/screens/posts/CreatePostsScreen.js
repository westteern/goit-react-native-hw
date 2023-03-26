import { Camera } from "expo-camera";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Button,
  KeyboardAvoidingView,
} from "react-native";

import { MaterialIcons, Octicons, AntDesign } from "@expo/vector-icons";

const initialState = {
  photo: null,
  coords: null,
  title: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
    })();

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

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.premissionContainer}>
        <Text style={{ textAlign: "center", padding: 15, fontSize: 16 }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const getPosition = async () => {
    const coordinates = await Location.getCurrentPositionAsync();
    getLocation(coordinates);
    setState((prevState) => ({
      ...prevState,
      coords: coordinates,
    }));
  };
  const getLocation = async (coordinates) => {
    const { latitude, longitude } = coordinates.coords;
    const data = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    data.forEach((loc) => {
      setState((prevState) => ({
        ...prevState,
        location: `${loc.isoCountryCode}, ${loc.city}`,
      }));
    });
  };
  const takePhoto = async () => {
    const photoRef = await camera.takePictureAsync();
    getPosition();
    setState((prevState) => ({
      ...prevState,
      photo: photoRef.uri,
    }));
  };
  const resetPhoto = () => {
    setCamera(null);
    setState((prevState) => ({
      ...prevState,
      photo: null,
      coords: null,
      location: "",
    }));
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const uploadPhoto = async () => {
    try {
      const response = await fetch(state.photo);
      const file = await response.blob();
      await uploadBytes(ref(storage, `postPhoto/${file._data.blobId}`), file);
      const photoUrl = await getDownloadURL(
        ref(storage, `postPhoto/${file._data.blobId}`)
      );
      return photoUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPost = async () => {
    try {
      const photo = await uploadPhoto();
      await addDoc(collection(db, "posts"), {
        ...state,
        photo,
        id: userId,
        login: login,
        postDate: Date.now().toString(),
        like: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    if (state.title === "" && state.photo === null) {
      alert("To create a post, add a photo and fill in the title field.");
      return;
    }
    await uploadPost();
    navigation.navigate("Posts");
    setCamera(null);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {state.photo ? (
          <View
            style={{
              ...styles.photoContainer,
              marginTop: isShowKeyboard ? 10 : 32,
            }}
          >
            <Image style={styles.photo} source={{ uri: state.photo }} />
            <Pressable style={styles.photoButton} onPress={resetPhoto}>
              <AntDesign name="delete" size={20} color="#BDBDBD" />
            </Pressable>
          </View>
        ) : (
          <Camera
            style={{
              ...styles.photoContainer,
              marginTop: isShowKeyboard ? 10 : 32,
            }}
            ref={setCamera}
          >
            <Pressable style={styles.photoButton} onPress={takePhoto}>
              <MaterialIcons name="photo-camera" size={20} color="#BDBDBD" />
            </Pressable>
          </Camera>
        )}
        <Text style={styles.loadLable}>Load a photo</Text>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View style={styles.inputBox}>
            <TextInput
              name="title"
              maxLength={30}
              style={{ ...styles.input, fontFamily: "Roboto-Medium" }}
              placeholder="Title"
              value={state.title}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  title: value,
                }))
              }
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
            />
          </View>
          <View style={styles.inputBox}>
            {state.location !== "" ? (
              <Octicons name="location" size={24} color="#FF6C00" />
            ) : (
              <Octicons name="location" size={24} color="#BDBDBD" />
            )}

            <TextInput
              name="location"
              maxLength={30}
              style={{ ...styles.input, marginLeft: 8 }}
              placeholder="Location"
              value={state.location}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  location: value,
                }))
              }
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
            />
          </View>
        </KeyboardAvoidingView>
        <View
          style={{ marginTop: 32, display: isShowKeyboard ? "none" : "flex" }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.btnInactive,
              backgroundColor:
                state.photo && state.title !== "" ? "#FF6C00" : "#F6F6F6",
            }}
            onPress={onSubmit}
          >
            <Text
              style={{
                ...styles.textBtnInactive,
                color:
                  state.photo && state.title !== "" ? "#FFFFFF" : "#BDBDBD",
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  photoContainer: {
    position: "relative",
    justifyContent: "center",
    width: "100%",
    height: 240,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  photoButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: "#FFFFFF4D",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  loadLable: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputBox: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  input: {
    width: "100%",
    paddingVertical: 15,
    paddingLeft: 2,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textBtn: {
    padding: 16,
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
  },
  textBtnInactive: {
    padding: 16,
    textAlign: "center",
    fontSize: 16,
    color: "#BDBDBD",
  },
  btnInactive: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  premissionContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
