import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { PostsCard } from "../../components/PostCard";
import { ListEmpty } from "../../components/ListEmpty";

const imageBg = require("../../../assets/images/photo-bg.jpg");

export default function RegistrationScreen({ navigation }) {
  const { login, avatar, userId } = useSelector((state) => state.auth);
  const [userAvatar, setUserAvatar] = useState(avatar || null);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authSingOutUser());
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserAvatar(result.assets[0].uri);
      console.log(avatar);
    }
  };

  useEffect(() => {
    const request = query(
      collection(db, "posts"),
      where("id", "==", userId),
      orderBy("postDate", "desc")
    );
    const unsubscribe = onSnapshot(request, (querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((doc) => {
        allPosts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(allPosts);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(posts);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={imageBg}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View style={styles.form}>
            <View style={styles.avatar}>
              <Image source={{ uri: userAvatar }} style={styles.avatarImg} />
              {userAvatar ? (
                <Pressable
                  onPress={() => {
                    setUserAvatar(null);
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
              onPress={logOut}
              title="LogOut"
              style={styles.logOutIcon}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
            <Text style={styles.formTitle}>{login}</Text>
            <SafeAreaView style={{ flex: 1, width: "100%" }}>
              <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<ListEmpty />}
                renderItem={({ item }) => (
                  <PostsCard
                    photo={item.photo}
                    title={item.title}
                    location={item.location}
                    coords={item.coords}
                    navigation={navigation}
                    postId={item.id}
                    likes={item.like}
                  />
                )}
              />
            </SafeAreaView>
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
    marginVertical: 32,
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
