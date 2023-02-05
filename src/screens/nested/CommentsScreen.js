import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ListEmpty } from "../../components/ListEmptyComments";

const initialState = {
  comment: "",
};

export default function CommentsScreen({ route }) {
  const [state, setState] = useState(initialState);
  const [isActive, setIsActive] = useState(false);

  const photo = route.params.photo;

  const onSubmit = () => {
    if (state.comment === "") {
      alert("To create a comment, the field must be filled.");
      return;
    }
    alert("Comment create!");
    setIsActive(false);
    setState(initialState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.postImage} source={photo} />
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={null}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<ListEmpty />}
          renderItem={({ item }) => <View />}
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
