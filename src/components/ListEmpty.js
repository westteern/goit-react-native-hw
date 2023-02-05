import { Text, View, StyleSheet } from "react-native";

export const ListEmpty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You don't have any posts yet, click on the "+" at the bottom of the
        screen and make your first post.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#BDBDBD",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 26,
    color: "#BDBDBD",
  },
});
