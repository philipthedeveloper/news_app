import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { SignIn, SignUp, Details, ChangePassword, Bio } from "./screens";
import Tabs from "./components/Tabs";
import Context from "./constants/Context";
import { Easing } from "react-native-reanimated";
import React, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

const Stack = createSharedElementStackNavigator();

const config = {
  animation: "timing",
  config: {
    duration: 400,
    easing: Easing.linear,
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = async () => {
    await SplashScreen.hideAsync();
  };

  const [loaded] = useFonts({
    black: require("./assets/fonts/Roboto-Black.ttf"),
    bold: require("./assets/fonts/Roboto-Bold.ttf"),
    light: require("./assets/fonts/Roboto-Light.ttf"),
    medium: require("./assets/fonts/Roboto-Medium.ttf"),
    regular: require("./assets/fonts/Roboto-Regular.ttf"),
    thin: require("./assets/fonts/Roboto-Thin.ttf"),
    abel: require("./assets/fonts/Abel-Regular.ttf"),
    osBold: require("./assets/fonts/Oswald-Bold.ttf"),
    osLight: require("./assets/fonts/Oswald-Light.ttf"),
    osExtraLight: require("./assets/fonts/Oswald-ExtraLight.ttf"),
    osMedium: require("./assets/fonts/Oswald-Medium.ttf"),
    osRegular: require("./assets/fonts/Oswald-Regular.ttf"),
    osSemiBold: require("./assets/fonts/Oswald-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Context layoutRun={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: true,
            // gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          initialRouteName="tabs"
        >
          <Stack.Screen name="signup" component={SignUp} />
          <Stack.Screen name="signin" component={SignIn} />
          <Stack.Screen
            name="details"
            component={Details}
            sharedElements={(props) => {
              const { title } = props.route.params;
              return [
                {
                  id: `news${title}`,
                },
              ];
            }}
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
            }}
          />
          <Stack.Screen name="tabs" component={Tabs} />
          <Stack.Screen name="bio" component={Bio} />
          {/* <Stack.Screen name="changepassword" component={ChangePassword} /> */}
        </Stack.Navigator>
      </Context>
    </NavigationContainer>
  );
}
