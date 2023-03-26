import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import { PostsCard } from "../../components/PostCard";
import { ListEmpty } from "../../components/ListEmpty";

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { login, email, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    const request = query(collection(db, "posts"), orderBy("postDate", "desc"));
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

  useFocusEffect(
    useCallback(() => {
      const request = query(
        collection(db, "posts"),
        orderBy("postDate", "desc")
      );

      const unsubscribe = onSnapshot(request, (querySnapshot) => {
        const allPosts = [];
        querySnapshot.forEach((doc) => {
          allPosts.push({ ...doc.data(), id: doc.id });
          console.log("push");
        });

        setPosts(allPosts);
      });
      return () => {
        unsubscribe();
        console.log("is focus");
        setPosts([]);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <View>
          <Image style={styles.avatar} source={{ uri: avatar }}></Image>
        </View>
        <View>
          <Text style={styles.name}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: "rgba(33, 33, 33, 1)",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
