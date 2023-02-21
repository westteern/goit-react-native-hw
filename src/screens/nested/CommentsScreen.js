import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";
import { ListEmpty } from "../../components/ListEmptyComments";
import { CommentCard } from "../../components/CommentCard";

const initialState = {
  comment: "",
  commentsList: [],
};

export default function CommentsScreen({ route }) {
  const [state, setState] = useState(initialState);
  const [isActive, setIsActive] = useState(false);

  const { photo, postId } = route.params;
  const { avatar, login } = useSelector((state) => state.auth);

  useEffect(() => {
    const request = query(
      collection(db, "posts", postId, "comments"),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(request, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setState((prevState) => ({
        ...prevState,
        commentsList: data,
      }));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getDate = () => {
    const dateNow = new Date();
    const formattedDate = `${dateNow.getDate()} ${dateNow.toLocaleString(
      "en-US",
      { month: "long" }
    )} ${dateNow.getFullYear()} | ${dateNow.getHours()}:${dateNow.getMinutes()}`;
    return formattedDate;
  };

  const onSubmit = async () => {
    const comment = state.comment;
    if (comment === "") {
      Toast.show({
        type: "error",
        text1: "To create a comment, the field must be filled.",
      });
      return;
    }
    const commentDate = getDate();

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      avatar,
      login,
      date: Date.now().toString(),
      commentDate,
    });
    setIsActive(false);
    setState((prevState) => ({
      ...prevState,
      comment: "",
    }));
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.postImage} source={photo} />
        </View>
        <SafeAreaView style={{ flex: 1, marginTop: 32 }}>
          <FlatList
            data={state.commentsList}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<ListEmpty />}
            renderItem={({ item }) => (
              <CommentCard
                avatar={item.avatar}
                comment={item.comment}
                login={item.login}
                date={item.commentDate}
              />
            )}
          />
        </SafeAreaView>
        <View style={styles.inputBox}>
          <TextInput
            name="comment"
            multiline={true}
            style={{
              ...styles.input,
              fontFamily: "Roboto-Medium",
              borderColor: isActive ? "#FF6C00" : "#E8E8E8",
              backgroundColor: isActive ? "#FFFFFF" : "#F6F6F6",
            }}
            placeholder="Comment"
            value={state.comment}
            onChangeText={(value) =>
              setState((prevState) => ({
                ...prevState,
                comment: value,
              }))
            }
            placeholderTextColor="#BDBDBD"
            onFocus={() => {
              setIsActive(true);
            }}
            onBlur={() => {
              setIsActive(false);
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.btn,
              backgroundColor: state.comment !== "" ? "#FF6C00" : "#BDBDBD",
            }}
            onPress={() => {
              onSubmit();
            }}
          >
            <View>
              <AntDesign name="arrowup" size={24} color="#FFFFFF" />
            </View>
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
  imageContainer: {
    width: "100%",
    height: 240,
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#212121",
  },
  postImage: {
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  inputBox: {
    position: "relative",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 100,
    fontSize: 16,
  },
  btn: {
    position: "absolute",
    right: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});
