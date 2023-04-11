import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Database } from "../constants/Context";

const ChangePassword = ({ navigation }) => {
  const { darkTheme: theme } = useContext(Database);

  return (
    <View
      style={{
        backgroundColor: theme.bgc,
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        paddingHorizontal: 14,
        position: "relative",
      }}
    >
      <View style={styles.header}>
        <Pressable
          style={[styles.pressIcon, { backgroundColor: theme.customHead }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" color={theme.textColor} size={20} />
        </Pressable>
        <Text style={[styles.headerText, { color: theme.textColor }]}>
          Change Password
        </Text>
        <Pressable
          style={{ ...styles.pressIcon, backgroundColor: "transparent" }}
        ></Pressable>
      </View>
      <View style={{ marginVertical: 16 }}>
        <View style={styles.bioInputCont}>
          <Text style={[styles.bioLabel, { color: theme.textColor }]}>
            Enter Current Password
          </Text>
          <TextInput
            placeholder="current password..."
            placeholderTextColor={theme.pHC}
            style={[styles.bioInput, { color: theme.textColor }]}
          />
        </View>
        <View style={styles.bioInputCont}>
          <Text style={[styles.bioLabel, { color: theme.textColor }]}>
            Enter New Password
          </Text>
          <TextInput
            placeholder="new password ..."
            placeholderTextColor={theme.pHC}
            style={[styles.bioInput, { color: theme.textColor }]}
          />
        </View>
        <View style={styles.bioInputCont}>
          <Text style={[styles.bioLabel, { color: theme.textColor }]}>
            Confirm Password
          </Text>
          <TextInput
            placeholder="confirm new password..."
            placeholderTextColor={theme.pHC}
            style={[styles.bioInput, { color: theme.textColor }]}
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={styles.saveBtnContainer}>
        <Pressable
          style={styles.saveBtn}
          android_ripple={{ color: "lightblue" }}
          onPress={() => navigation.navigate("profile")}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "bold",
    fontSize: 16,
  },
  pressIcon: {
    width: 35,
    height: 35,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  bioLabel: {
    fontFamily: "medium",
    fontSize: 14,
  },

  bioInput: {
    padding: 12,
    fontFamily: "abel",
    borderBottomColor: "lightblue",
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderRadius: 10,
  },

  bioInputCont: {
    marginVertical: 10,
  },

  saveBtnContainer: {
    height: 150,
    justifyContent: "flex-end",
    marginBottom: 30,
    bottom: 0,
  },

  saveBtn: {
    backgroundColor: "royalblue",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
  },

  saveBtnText: {
    color: "#fff",
    fontFamily: "regular",
    fontSize: 14,
  },
});

export default ChangePassword;
