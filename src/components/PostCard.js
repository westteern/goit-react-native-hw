import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getCountFromServer,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Image, Text, View, Pressable, StyleSheet } from "react-native";
import { Octicons, Feather, SimpleLineIcons } from "@expo/vector-icons";

export const PostsCard = ({
  photo,
  title,
  location,
  navigation,
  coords,
  postId,
  likes,
}) => {
  const [commentsCounter, setCommentsCounter] = useState(null);
  const [likesCounter, setLikesCounter] = useState(null);
  const [like, setLike] = useState(false);

  const getCommentsCount = async () => {
    try {
      const request = collection(db, "posts", postId, "comments");
      const snapshot = await getCountFromServer(request);
      setCommentsCounter(snapshot.data().count);
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.log(error);
    }
  };

  const onLike = async () => {
    setLike(!like);
    if (like) {
      await updateDoc(doc(db, "posts", postId), {
        like: likes - 1,
      });
      setLikesCounter(likesCounter - 1);
      return;
    }
    await updateDoc(doc(db, "posts", postId), {
      like: likes ? likes + 1 : 1,
    });
    setLikesCounter(likesCounter + 1);
    return;
  };

  useEffect(() => {
    getCommentsCount();
    setLikesCounter(likes || 0);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.postImage} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.comments}>
          <View style={styles.bottomContainer}>
            <Pressable
              onPress={() => navigation.navigate("Comments", { photo, postId })}
            >
              {commentsCounter === 0 ? (
                <Feather name="message-circle" size={24} color="#BDBDBD" />
              ) : (
                <Feather name="message-circle" size={24} color="#FF6C00" />
              )}
            </Pressable>
            <Text style={styles.commentsQuantity}>{commentsCounter}</Text>
          </View>
          <View style={{ ...styles.bottomContainer, marginLeft: 27 }}>
            <Pressable onPress={onLike}>
              {likesCounter === 0 ? (
                <SimpleLineIcons name="like" size={22} color="#BDBDBD" />
              ) : (
                <SimpleLineIcons name="like" size={22} color="#FF6C00" />
              )}
            </Pressable>
            <Text style={styles.commentsQuantity}>{likes ? likes : 0}</Text>
          </View>
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
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
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
    marginLeft: 9,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
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
