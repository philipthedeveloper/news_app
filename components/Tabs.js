import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useRef, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Saved, Notification, Profile } from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import TopTab from "./TopTab";
import { Database } from "../constants/Context";

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { onPress, accessibilityState, children } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);
  const { layoutRun, darkTheme } = useContext(Database);
  const {
    route: { name: routeName },
    activeTintColor,
  } = children.props.children[0].props;

  const backgroundC = {
    home: "#7C37FA",
    saved: "#3C5A99",
    notification: "#F95341",
    profile: "royalblue",
  };

  const tabBarIcon = () => {
    let iconName;
    let color;
    if (routeName === "home") {
      iconName = focused ? "home" : "home-outline";
      color = focused ? activeTintColor : "lightblue";
      return <Ionicons name={iconName} size={18} color={color} />;
    } else if (routeName === "saved") {
      iconName = focused ? "bookmark" : "bookmark-outline";
      color = focused ? activeTintColor : "lightblue";
      return <Ionicons name={iconName} size={18} color={color} />;
    } else if (routeName === "notification") {
      iconName = focused ? "notifications" : "notifications-outline";
      color = focused ? activeTintColor : "lightblue";
      return <Ionicons name={iconName} size={18} color={color} />;
    } else if (routeName === "profile") {
      iconName = focused ? "user" : "user-o";
      color = focused ? activeTintColor : "lightblue";
      return <FontAwesome name={iconName} size={18} color={color} />;
    }
  };

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <Pressable onPress={onPress} style={[styles.tabButton]}>
      <View onLayout={layoutRun}>
        <Animatable.View
          ref={viewRef}
          duration={500}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: backgroundC[routeName], borderRadius: 12 },
          ]}
        />
        <View
          style={[
            styles.tabButContainer,
            { backgroundColor: focused ? null : backgroundC[routeName] },
          ]}
        >
          {tabBarIcon()}
          <Animatable.View ref={textViewRef} duration={500}>
            {focused && (
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 8,
                  fontFamily: "regular",
                  fontSize: 11,
                }}
              >
                {routeName}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </Pressable>
  );
};

const Tabs = () => {
  const { darkTheme } = useContext(Database);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "orange",
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          backgroundColor: darkTheme.cardBgc,
          alignItems: "center",
          flexDirection: "row",
        },
        tabBarButton: (props) => {
          return <TabButton {...props} />;
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="home" component={TopTab} />
      <Tab.Screen name="saved" component={Saved} />
      <Tab.Screen name="notification" component={Notification} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  tabButContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },
});

export default Tabs;
