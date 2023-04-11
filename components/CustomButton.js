import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text }) => {
  return (
    <Pressable
      style={styles.pressable}
      android_ripple={{ color: "#9156ff" }}
      onPress={onPress}
    >
      <Text style={styles.signupText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#7C37FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    marginVertical: 30,
    borderRadius: 25,
  },

  signupText: {
    color: "#fff",
    fontFamily: "bold",
    fontSize: 16,
  },
});

export default CustomButton;
