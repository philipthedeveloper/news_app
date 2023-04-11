import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomTextInput = ({
  name,
  placeholder,
  changeHandler,
  secureTextEntry,
  keyboardType,
  multiline,
  value,
  style,
  ptc,
}) => {
  return (
    <TextInput
      style={[styles.textinput, style]}
      placeholder={placeholder}
      onChangeText={(value) => changeHandler(name, value)}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      multiline={multiline}
      value={value}
      placeholderTextColor={ptc}
    />
  );
};

const styles = StyleSheet.create({
  textinput: {
    padding: 8,
    paddingHorizontal: 14,
    borderRadius: 25,
    backgroundColor: "#F5F6FA",
    fontFamily: "regular",
  },
});

export default CustomTextInput;
