import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Database } from "../constants/Context";
import CustomTextInput from "../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import CustomButton from "../components/CustomButton";
import { FaceBookButton, GoogleButton } from "../components/SocialButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth();

const SignUp = () => {
  const [secure, setSecure] = useState(true);
  const {
    register,
    layoutRun,
    isDarkTheme,
    darkTheme: theme,
  } = useContext(Database);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function prepare() {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user !== null) {
            navigation.reset({
              routes: [{ name: "tabs" }],
            });
          } else {
            layoutRun();
            return;
          }
        });
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  const handleInput = (name, value) => {
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    if (username.length < 2) {
      setIsLoading(false);
      Alert.alert("Error❗", "Username cannot be less than 2 characters", [
        { text: "OK" },
      ]);

      return;
    } else if (!email.includes("@gmail.com")) {
      setIsLoading(false);
      Alert.alert("Error❗", "Please enter a valid email.", [{ text: "OK" }]);
      return;
    } else if (password.length < 8) {
      setIsLoading(false);
      Alert.alert("Error❗", "Password cannot be less than 8 characters", [
        { text: "OK" },
      ]);
      return;
    } else if (password === username) {
      setIsLoading(false);
      Alert.alert(
        "Warning ⚠️",
        "For security reasons, it is advisable to use a password different from your username.",
        [{ text: "OK" }]
      );
      return;
    }
    const newUser = { email, password, username };
    try {
      let res = await register(newUser);
      setIsLoading(false);
      if (res.type === "success") {
        // await AsyncStorage.setItem("isSignedIn", "true");
        navigation.reset({
          routes: [{ name: "home" }],
        });
      } else {
        console.log("called");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0, 0.2)",
            position: "absolute",
            zIndex: 50,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <ActivityIndicator
            size={"large"}
            color="#7C37FA"
            animating={isLoading}
          />
        </View>
      )}
      <View style={[styles.container, { backgroundColor: theme.bgc }]}>
        <StatusBar
          backgroundColor={theme.bgc}
          translucent={true}
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
        />

        <View
          style={{
            alignItems: "center",
            marginBottom: 60,
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={styles.img}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 30,
              marginBottom: 20,
              color: theme.textColor,
            }}
          >
            Sign Up
          </Text>

          <View style={styles.textinputView}>
            <CustomTextInput
              name="username"
              placeholder="Enter username"
              changeHandler={handleInput}
              secureTextEntry={false}
              keyboardType="default"
              multiline={false}
              value={username}
              style={{ backgroundColor: theme.cardBgc, color: theme.textColor }}
              ptc={theme.pHC}
            />
          </View>
          <View style={styles.textinputView}>
            <CustomTextInput
              name="email"
              placeholder="example@gmail.com"
              changeHandler={handleInput}
              secureTextEntry={false}
              keyboardType="default"
              multiline={false}
              value={email}
              style={{ backgroundColor: theme.cardBgc, color: theme.textColor }}
              ptc={theme.pHC}
            />
          </View>
          <View
            style={{
              ...styles.passwordView,
            }}
          >
            <CustomTextInput
              name="password"
              placeholder="Enter Password"
              changeHandler={handleInput}
              secureTextEntry={secure}
              keyboardType="default"
              multiline={false}
              value={password}
              style={{
                flex: 1,
                backgroundColor: theme.cardBgc,
                color: theme.textColor,
              }}
              ptc={theme.pHC}
            />
            <FontAwesome5
              name={secure ? "eye-slash" : "eye"}
              size={18}
              color={theme.textColor}
              onPress={() => setSecure(!secure)}
              style={styles.secureIcon}
            />
          </View>
          <CustomButton onPress={handleSignUp} text="Sign Up" />
          <View>
            <Text
              style={{
                ...styles.signupText,
                color: theme.textColor,
                textAlign: "center",
                fontFamily: "abel",
              }}
            >
              ------- OR --------
            </Text>
          </View>
          <View style={styles.socialSignup}>
            <FaceBookButton />
            <GoogleButton />
          </View>
          <View style={styles.alreadyHaveAccountView}>
            <Text
              style={[
                styles.alreadyHaveAccountText,
                { color: theme.textColor },
              ]}
            >
              Already have an account?
            </Text>
            <Text
              style={{
                ...styles.alreadyHaveAccountText,
                color: "blue",
                marginLeft: 2,
              }}
              onPress={() => navigation.navigate("signin")}
            >
              Sign In
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },

  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: StatusBar.currentHeight + 14,
    width: "100%",
    backgroundColor: "#fff",
  },

  textinput: {
    padding: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#F5F6FA",
    fontFamily: "regular",
  },

  passwordView: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    marginVertical: 14,
  },

  secureIcon: {
    position: "absolute",
    right: 10,
  },

  textinputView: {
    marginVertical: 14,
  },

  socialSignup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

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

  alreadyHaveAccountView: {
    flexDirection: "row",
    justifyContent: "center",
  },

  alreadyHaveAccountText: {
    fontFamily: "medium",
  },
});

export default SignUp;
