import { Text, View, StyleSheet } from "react-native";

export const ListEmpty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        No one has left a comment yet. Be the first!
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
