import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Database } from "../constants/Context";

const Notification = () => {
  const { darkTheme } = useContext(Database);

  return (
    <View
      style={{
        backgroundColor: darkTheme.bgc,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: darkTheme.textColor }}>Notification</Text>
    </View>
  );
};

export default Notification;
