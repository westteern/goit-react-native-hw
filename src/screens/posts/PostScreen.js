import { useState, useEffect } from "react";
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

const USER = {
  avatar: require("../../../assets/images/avatar.png"),
  name: "Natali Romanova",
  email: "email@example.com",
};

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(USER);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);

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
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<ListEmpty />}
          renderItem={({ item }) => (
            <PostsCard
              photo={item.photo}
              title={item.title}
              location={item.location}
              coords={item.coords}
              navigation={navigation}
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
