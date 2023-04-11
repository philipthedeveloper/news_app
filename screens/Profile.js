import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { CheckBox } from "@rneui/themed";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { Database } from "../constants/Context";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const bottomSheetRef = useRef(null);
  const [sheetIndex, setSheetIndex] = useState(-1);
  const snapPoints = useMemo(() => ["50%"], []);
  const {
    darkTheme: theme,
    handleDarkTheme,
    isDarkTheme,
    username,
  } = useContext(Database);
  const navigation = useNavigation();

  useFocusEffect(() => {
    return () => {
      bottomSheetRef.current.close();
    };
  });

  const handleSheetChanges = useCallback((index) => {
    setSheetIndex(index);
  }, []);

  const handleBio = () => {
    navigation.navigate("bio");
  };

  // const handlePassword = () => {
  //   navigation.navigate("changepassword");
  // };

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
      {/* <StatusBar backgroundColor={"#fff"} translucent={true} /> */}

      <View style={styles.header}>
        <Pressable
          style={[styles.pressIcon, { backgroundColor: theme.customHead }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" color={theme.textColor} size={20} />
        </Pressable>
        <Text style={[styles.headerText, { color: theme.textColor }]}>
          Profile
        </Text>
        <Pressable
          style={[styles.pressIcon, { backgroundColor: theme.customHead }]}
          onPress={() => setSheetIndex(0)}
        >
          <MaterialCommunityIcons
            name="account-cog-outline"
            color={theme.textColor}
            size={20}
          />
        </Pressable>
      </View>
      <View
        style={{
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              overflow: "hidden",
            }}
          >
            <Image
              source={require("../assets/jpegs/avatar.png")}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <Entypo
            name="camera"
            color={"gray"}
            size={40}
            // onPress={setShowWarning}
            style={{ position: "absolute", bottom: 0, right: -10 }}
          />
        </View>
        <Text
          style={{
            marginVertical: 10,
            fontFamily: "medium",
            fontSize: 18,
            color: theme.textColor,
          }}
        >
          {username || "Anonymous"}
        </Text>
        <Text
          style={{
            marginBottom: 10,
            fontFamily: "regular",
            fontSize: 12,
            textAlign: "center",
            color: theme.textColor,
          }}
        >
          No Description. Edit in Bio.
        </Text>
        <View>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 5,
            }}
          >
            <Ionicons name="mail" color={theme.textColor} size={20} />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: "abel",
                fontSize: 12,
                color: theme.textColor,
              }}
            >
              philipowolabi79@gmail.com
            </Text>
          </View> */}
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 5,
            }}
          >
            <Ionicons name="call" color={theme.textColor} size={20} />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: "abel",
                fontSize: 12,
                color: theme.textColor,
              }}
            >
              +234-090-7206-0752
            </Text>
          </View> */}
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 16,
            marginBottom: 5,
            backgroundColor: theme.customHead,
            padding: 12,
            borderRadius: 25,
            color: theme.textColor,
          }}
        >
          Theme:{" "}
        </Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 5,
            marginLeft: 20,
            marginRight: -12,
          }}
          onPress={() => handleDarkTheme(false)}
          android_ripple={{ color: ["lightblue"] }}
        >
          <Text style={{ fontFamily: "regular", color: theme.textColor }}>
            Light Theme
          </Text>
          <CheckBox
            checked={!isDarkTheme}
            containerStyle={{
              marginLeft: 0,
              padding: 0,
              backgroundColor: "transparent",
            }}
            wrapperStyle={{
              backgroundColor: "transparent",
            }}
            checkedIcon={
              <Ionicons name="radio-button-on" color={"#7C37FA"} size={22} />
            }
            uncheckedIcon={
              <Ionicons name="radio-button-off" color={"#7C37FA"} size={22} />
            }
          />
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 5,
            marginRight: -12,
            marginLeft: 20,
          }}
          onPress={() => handleDarkTheme(true)}
          android_ripple={{ color: ["lightblue"] }}
        >
          <Text style={{ fontFamily: "regular", color: theme.textColor }}>
            Dark Theme
          </Text>
          <CheckBox
            checked={isDarkTheme}
            containerStyle={{
              marginHorizontal: 0,
              padding: 0,
              backgroundColor: "transparent",
            }}
            wrapperStyle={{
              marginHorizontal: 0,
            }}
            checkedIcon={
              <Ionicons name="radio-button-on" color={"#7C37FA"} size={22} />
            }
            uncheckedIcon={
              <Ionicons name="radio-button-off" color={"#7C37FA"} size={22} />
            }
          />
        </Pressable>
      </View>
      {/* {user && (
        <View
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            borderRadius: 8,
            position: "absolute",
            width: "100%",
            bottom: 20,
            marginHorizontal: 14,
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              borderRadius: 25,
              backgroundColor: theme.customHead,
            }}
            onPress={logout}
            android_ripple={{ color: "gray" }}
          >
            <AntDesign name="logout" size={17} color={theme.textColor} />
            <Text
              style={{
                color: theme.textColor,
                fontSize: 17,
                fontFamily: "regular",
                marginLeft: 40,
              }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      )} */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={sheetIndex}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        style={styles.bottomSheetStyle}
        backgroundStyle={{
          backgroundColor: theme.bottomSheetBgc,
          borderRadius: 30,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...styles.bottomSheetText,
              fontFamily: "bold",
              marginVertical: 14,
              textAlign: "center",
              color: theme.textColor,
            }}
          >
            Swipe Down to Close
          </Text>
          <Pressable style={styles.bottomSheetBtn} onPress={handleBio}>
            <Text style={[styles.bottomSheetText, { color: theme.textColor }]}>
              Edit Bio...
            </Text>
          </Pressable>
          {/* <Pressable style={styles.bottomSheetBtn} onPress={handlePassword}>
            <Text style={[styles.bottomSheetText, { color: theme.textColor }]}>
              Change Password...
            </Text>
          </Pressable> */}
        </View>
      </BottomSheet>
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

  bottomSheetBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
  },

  bottomSheetText: {
    fontFamily: "regular",
    fontSize: 14,
  },

  bottomSheetStyle: {
    flex: 1,
    elevation: 20,
    shadowColor: "#000",
    backgroundColor: "red",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
    paddingHorizontal: 14,
  },
});

export default Profile;
