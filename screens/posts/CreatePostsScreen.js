import { AntDesign } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons, Octicons } from "@expo/vector-icons";

export default function CreatePostsScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Pressable
            style={styles.photoButton}
            onPress={() => alert("Add photo")}
          >
            <MaterialIcons name="photo-camera" size={20} color="#BDBDBD" />
          </Pressable>
        </View>
        <Text style={styles.loadLable}>Load a photo</Text>
        <View style={styles.inputBox}>
          <TextInput
            name="title"
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#BDBDBD"
          />
        </View>
        <View style={styles.inputBox}>
          <Octicons name="location" size={24} color="#BDBDBD" />
          <TextInput
            name="title"
            style={{ ...styles.input, marginLeft: 8 }}
            placeholder="Location"
            placeholderTextColor="#BDBDBD"
          />
        </View>
        <View style={{ marginTop: 32 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnInactive}
            onPress={() => "post created"}
          >
            <Text style={styles.textBtnInactive}>Publish</Text>
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
    backgroundColor: "#FFFFFF",
  },
  loadLable: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputBox: {
    marginTop: 16,
    paddingVertical: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  input: {
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
  btnActive: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnInactive: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
});
