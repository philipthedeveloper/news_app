import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FaceBookButton = () => {
  return (
    <Pressable style={styles.facebook}>
      <FontAwesome name="facebook" size={16} color="white" />
      <Text style={styles.signupText}>Facebook</Text>
    </Pressable>
  );
};

const GoogleButton = () => {
  return (
    <Pressable style={styles.google}>
      <FontAwesome name="google-plus" size={16} color="white" />
      <Text style={styles.signupText}>Google</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  facebook: {
    backgroundColor: "#3C5A99",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 12,
    marginVertical: 30,
    borderRadius: 25,
    minWidth: 110,
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
  },

  google: {
    backgroundColor: "#F95341",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 12,
    marginVertical: 30,
    borderRadius: 25,
    minWidth: 110,
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
  },

  signupText: {
    color: "#fff",
    fontFamily: "bold",
    fontSize: 16,
  },
});

export { FaceBookButton, GoogleButton };
