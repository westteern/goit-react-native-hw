import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import Home from "./screens/posts/Home";
import MapScreen from "./screens/nested/MapScreen";
import CommentsScreen from "./screens/nested/CommentsScreen";

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          height: 88,
          borderBottomWidth: 1,
          borderBottomColor: "#BDBDBD",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          alignSelf: "center",
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          color: "#212121",
        },
      }}
    >
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <HomeStack.Screen name="Comments" component={CommentsScreen} />
      <HomeStack.Screen name="Map" component={MapScreen} />
    </HomeStack.Navigator>
  );
};
