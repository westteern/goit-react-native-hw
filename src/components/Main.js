import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { onStateChange } from "../redux/auth/authSlice";

export default function Main() {
  const [isAuth, setIsAuth] = useState(null);
  auth.onAuthStateChanged((user) => setIsAuth(user));
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const updateUser = {
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        };
        dispatch(onStateChange(updateUser));
      }
    });
  }, []);
  const routing = useRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
}
