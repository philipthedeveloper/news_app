import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Database } from "../constants/Context";

const Bio = ({ navigation }) => {
  const { username, handleUsername, darkTheme: theme } = useContext(Database);
  const [localUsername, setLocalUsername] = useState(username);

  return (
    <ScrollView
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
        <Text style={[styles.headerText, { color: theme.textColor }]}>Bio</Text>
        <Pressable
          style={{ ...styles.pressIcon, backgroundColor: "transparent" }}
        ></Pressable>
      </View>
      <View style={{ marginVertical: 16 }}>
        <View style={styles.bioInputCont}>
          <Text style={[styles.bioLabel, { color: theme.textColor }]}>
            Username
          </Text>
          <TextInput
            placeholder="username..."
            placeholderTextColor={theme.pHC}
            style={[styles.bioInput, { color: theme.textColor }]}
            value={localUsername}
            onChangeText={(value) => setLocalUsername(value)}
          />
        </View>
        <View style={styles.bioInputCont}>
          <Text style={[styles.bioLabel, { color: theme.textColor }]}>
            About me
          </Text>
          <TextInput
            placeholder="about me..."
            placeholderTextColor={theme.pHC}
            style={[styles.bioInput, { color: theme.textColor }]}
          />
        </View>
        {/* <View style={styles.bioInputCont}>
          <Text style={[styles.bioLabel, { color: theme.textColor }]}>
            Contact email
          </Text>
          <TextInput
            placeholder="email..."
            placeholderTextColor={theme.pHC}
            style={[styles.bioInput, { color: theme.textColor }]}
            keyboardType="email-address"
          />
        </View> */}
        {/* <View style={styles.bioInputCont}>
          <Text style={[styles.bioLabel, { color: theme.textColor }]}>Tel</Text>
          <TextInput
            placeholder="tel..."
            placeholderTextColor={theme.pHC}
            style={[styles.bioInput, { color: theme.textColor }]}
            keyboardType="phone-pad"
          />
        </View> */}
      </View>
      <View style={styles.saveBtnContainer}>
        <Pressable
          style={styles.saveBtn}
          android_ripple={{ color: "lightblue" }}
          onPress={() => handleUsername(localUsername)}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
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

export default Bio;
