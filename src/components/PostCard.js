import { Image, Text, View, Pressable, StyleSheet } from "react-native";

import { Octicons, Feather } from "@expo/vector-icons";

export const PostsCard = ({ photo, title, location, navigation, coords }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={photo} style={styles.postImage} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.comments}>
          <Pressable onPress={() => navigation.navigate("Comments", { photo })}>
            <Feather name="message-circle" size={24} color="#BDBDBD" />
          </Pressable>
          <Text style={styles.commentsQuantity}> 0</Text>
        </View>
        <View style={styles.location}>
          {location !== "" ? (
            <Pressable
              onPress={() =>
                navigation.navigate("Map", { title, photo, location, coords })
              }
            >
              <Octicons name="location" size={24} color="#FF6C00" />
            </Pressable>
          ) : (
            <Octicons name="location" size={24} color="#BDBDBD" />
          )}
          <Text style={styles.locationTitle}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  imageContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#212121",
  },
  postImage: {
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsQuantity: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTitle: {
    marginLeft: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
