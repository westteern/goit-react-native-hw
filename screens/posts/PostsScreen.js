import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import { PostsCard } from "../../components/PostCard";

const USER = {
  avatar: require("../../assets/images/avatar.png"),
  name: "Natali Romanova",
  email: "email@example.com",
};
const POSTS = [
  {
    id: "1",
    url: require("../../assets/images/lake.png"),
    title: "Lake",
    mapMark: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: "2",
    url: require("../../assets/images//forest.png"),
    title: "Forest",
    mapMark: "Ivano-Frankivs'k Region, Ukraine",
  },
];

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState(POSTS);
  const [user, setUser] = useState(USER);
  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <Image style={styles.avatar} source={user.avatar}></Image>
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostsCard
              url={item.url}
              title={item.title}
              mapMark={item.mapMark}
            />
          )}
          keyExtractor={(item) => item.id}
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
