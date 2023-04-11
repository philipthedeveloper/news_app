import { View, Text, Alert } from "react-native";
import React, { useReducer, useState, useEffect, useCallback } from "react";
import { reducer, savedReducer } from "../controllers/reducer";
import data from "./data";
import { useNavigation } from "@react-navigation/native";
import app from "../components/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();

const Database = React.createContext();
export { Database };

const Context = ({ children, layoutRun }) => {
  const [newsData, dispatch] = useReducer(reducer, data);
  const [saved, dispatchSaved] = useReducer(savedReducer, []);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("GUEST_KDUIDSK");
  const navigation = useNavigation();
  const [darkTheme, setDarkTheme] = useState({
    bgc: "#0d0a2b",
    textColor: "#efefef",
    cardBgc: "#1f1a49",
    customHead: "#4d468c",
    pHC: "#efefef",
    bottomSheetBgc: "#4d468c",
  });
  const lightTheme = {
    bgc: "#F2F2F2",
    textColor: "#000",
    cardBgc: "#fff",
    customHead: "rgba(0, 0, 0, 0.1)",
    pHC: "gray",
    bottomSheetBgc: "#fff",
  };
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    colorData();
    const sub = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setUsername(user.displayName);
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return sub;
  }, [auth]);

  const register = async ({ username, email, password }) => {
    try {
      let result = await createUserWithEmailAndPassword(auth, email, password);
      if (result) {
        await updateProfile(auth.currentUser, { displayName: username });
        setUsername(auth.currentUser.displayName);
        return { type: "success" };
      }
    } catch (error) {
      Alert.alert("Error❗", `${error.code.replace("auth/", "")}`, [
        { text: "OK" },
      ]);
    }
  };

  const login = async ({ email, password }) => {
    try {
      // console.log("processing");
      await signInWithEmailAndPassword(auth, email, password);
      // console.log("processed");
      // await AsyncStorage.setItem("isSignedIn", "true");
      return "success";
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error❗", `Invalid Email: ${"user-not-found"}`, [
          { text: "OK" },
        ]);
        return "error";
      }
      Alert.alert("Error❗", `${error.code.replace("auth/", "")}`, [
        { text: "OK" },
      ]);
      return "error";
    }
  };

  const handleUsername = async (username) => {
    try {
      await updateProfile(auth.currentUser, { displayName: username });
      setUsername(auth.currentUser.displayName);
    } catch (error) {
      Alert.alert("Error❗", `${error.code}`, [{ text: "OK" }]);
      return;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        routes: [{ name: "signin" }],
      });
      // await AsyncStorage.setItem("isSignedIn", "false");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDarkTheme = async (isDark) => {
    try {
      if (!isDark) {
        setIsDarkTheme(isDark);
        setDarkTheme(lightTheme);
        await AsyncStorage.setItem("darktheme", JSON.stringify(lightTheme));
        await AsyncStorage.setItem("isdarktheme", JSON.stringify(isDark));
        return;
      } else {
        let colors = {
          bgc: "#0d0a2b",
          textColor: "#efefef",
          cardBgc: "#1f1a49",
          customHead: "#4d468c",
          pHC: "#efefef",
          bottomSheetBgc: "#4d468c",
        };
        setIsDarkTheme(isDark);
        setDarkTheme(colors);

        await AsyncStorage.setItem("darktheme", JSON.stringify(colors));
        await AsyncStorage.setItem("isdarktheme", "true");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const colorData = async () => {
    try {
      const userColor = JSON.parse(await AsyncStorage.getItem("darktheme"));
      const isdark = await AsyncStorage.getItem("isdarktheme");
      const saved = JSON.parse(await AsyncStorage.getItem("saved"));

      if (saved === null) {
        await AsyncStorage.setItem("saved", JSON.stringify([]));
        dispatchSaved({ type: "fromStorage", payload: [] });
      } else {
        dispatchSaved({ type: "fromStorage", payload: saved });
      }
      if (userColor !== null) {
        setDarkTheme(userColor);
        if (isdark === "true") {
          setIsDarkTheme(true);
        } else if (isdark === "false") {
          setIsDarkTheme(false);
        }
      } else {
        let colors = {
          bgc: "#0d0a2b",
          textColor: "#efefef",
          cardBgc: "#1f1a49",
          customHead: "#4d468c",
          pHC: "#efefef",
          bottomSheetBgc: "#4d468c",
        };
        setIsDarkTheme(true);
        setDarkTheme(colors);
        await AsyncStorage.setItem("darktheme", JSON.stringify(colors));
        await AsyncStorage.setItem("isdarktheme", "true");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const returnUser = () => {
    return user;
  };

  const addComment = (text, parentId, postId) => {
    dispatch({
      type: "addComment",
      payload: { text, parentId, postId, username },
    });
  };

  const deleteComment = (commentId, postId) => {
    Alert.alert("Confirm", "Are you sure that you want to remove comment?", [
      {
        text: "YES",
        onPress: () =>
          dispatch({ type: "delete", payload: { commentId, postId } }),
      },
      { text: "NO" },
    ]);
  };

  const replyComment = (text, replyTo, parentId, postId) => {
    dispatch({
      type: "reply",
      payload: { text, replyTo, parentId, postId, username },
    });
  };

  const editComment = (text, commentId, postId) => {
    dispatch({
      type: "edit",
      payload: { text, commentId, postId },
    });
  };

  return (
    <Database.Provider
      value={{
        newsData,
        saved,
        dispatchSaved,
        register,
        logout,
        login,
        username,
        handleUsername,
        layoutRun,
        user,
        darkTheme,
        isDarkTheme,
        handleDarkTheme,
        addComment,
        deleteComment,
        replyComment,
        editComment,
      }}
    >
      {children}
    </Database.Provider>
  );
};

export default Context;
