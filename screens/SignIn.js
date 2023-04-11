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
import React, { useState, useContext } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Database } from "../constants/Context";
import CustomTextInput from "../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { FaceBookButton, GoogleButton } from "../components/SocialButton";

const SignIn = () => {
  const [secure, setSecure] = useState(true);
  const { login, darkTheme: theme, isDarkTheme } = useContext(Database);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleInput = (name, value) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email.includes("@gmail.com")) {
      setIsLoading(false);
      Alert.alert("Error❗", "Please enter a valid email.", [{ text: "OK" }]);
      return;
    } else if (password.length < 8) {
      setIsLoading(false);
      Alert.alert("Error❗", "Password cannot be less than 8 characters", [
        { text: "OK" },
      ]);
      return;
    }
    const userSignedIn = { email, password };
    try {
      // console.log("sending request");
      let res = await login(userSignedIn);
      // console.log("response received");
      setIsLoading(false);
      if (res === "success") {
        // console.log("trying to navigate");
        navigation.reset({
          routes: [{ name: "tabs" }],
        });
        return;
      } else {
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
        <View style={{ alignItems: "center", marginBottom: 60 }}>
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
            Sign In
          </Text>
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
          <CustomButton onPress={handleLogin} text="Login" />
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
              Don't have an account?
            </Text>
            <Text
              style={{
                ...styles.alreadyHaveAccountText,
                color: "blue",
                marginLeft: 2,
              }}
              onPress={() => navigation.navigate("signup")}
            >
              Sign Up
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

  alreadyHaveAccountView: {
    flexDirection: "row",
    justifyContent: "center",
  },

  alreadyHaveAccountText: {
    fontFamily: "medium",
  },
});

export default SignIn;
