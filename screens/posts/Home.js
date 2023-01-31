import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const PostsTabNavigator = createBottomTabNavigator();
const windowWidth = Dimensions.get("window").width;

export default function Home({ navigation }) {
  return (
    <PostsTabNavigator.Navigator
      screenOptions={{
        lazy: true,
        tabBarHideOnKeyboard: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          position: "absolute",
          bottom: 11,
          alignSelf: "center",
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          color: "#212121",
        },
        headerStyle: {
          height: 88,
          borderBottomWidth: 1,
          borderBottomColor: "#BDBDBD",
        },
        tabBarStyle: {
          paddingLeft: (windowWidth - 210) / 2,
          height: 83,
          borderTopWidth: 1,
          borderTopColor: "#BDBDBD",
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          marginTop: 9,
          maxWidth: 70,
          height: 40,
          borderRadius: 20,
        },
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#212121CC",
      }}
    >
      <PostsTabNavigator.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Login")}
              title="LogOut"
              style={{
                right: 18,
                bottom: 11,
                position: "absolute",
              }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
      ></PostsTabNavigator.Screen>
      <PostsTabNavigator.Screen
        name="Create post"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
        }}
      ></PostsTabNavigator.Screen>
      <PostsTabNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      ></PostsTabNavigator.Screen>
    </PostsTabNavigator.Navigator>
  );
}
