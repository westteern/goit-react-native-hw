import { useSelector } from "react-redux";
import { Image, StyleSheet, Text, View } from "react-native";

export const CommentCard = ({ login, avatar, comment, date }) => {
  const username = useSelector((state) => state.auth.login);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: username === login ? "row-reverse" : "row",
          marginBottom: 24,
        }}
      >
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={username === login ? styles.userComment : styles.comment}>
          <Text style={styles.text}>{comment}</Text>
          <Text
            style={{
              ...styles.date,
              textAlign: username === login ? "left" : "right",
            }}
          >
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 50,
  },
  comment: {
    flex: 1,
    marginLeft: 16,

    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  userComment: {
    marginRight: 16,
    flex: 1,

    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  date: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
});
