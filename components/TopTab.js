import React, { useRef, useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomePage } from "../screens/Home";
import Categories from "../constants/categories";
import { day, date, month } from "../constants/date";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { Database } from "../constants/Context";

import {
  Story,
  Politics,
  Sports,
  Technology,
  Science,
  Video,
  Health,
  Entertainment,
  Business,
  Religion,
} from "../screens/subScreen";

function MyTabBar({ state, descriptors, navigation, position }) {
  const [categories, setCategories] = React.useState(Categories);
  // const flatRef = useRef(null);
  const { username, darkTheme, isDarkTheme } = useContext(Database);
  const [localUsername, setLocalUsername] = useState(username);
  useEffect(() => {
    const unsub = setLocalUsername(username);
    return unsub;
  }, [username]);

  const stateIndex = state.index;

  const updateCat = (ind, name) => {
    const newCat = categories.map((item, index) => {
      if (index === ind) {
        item.isFocused = true;
      } else {
        item.isFocused = false;
      }
      return item;
    });
    setCategories(newCat);
    navigation.navigate(name);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: darkTheme.bgc,
        paddingHorizontal: 14,
        paddingTop: StatusBar.currentHeight + 5,
        position: "relative",
      }}
    >
      <StatusBar
        backgroundColor={darkTheme.bgc}
        translucent={true}
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              source={require("../assets/jpegs/avatar.png")}
              resizeMode="contain"
              style={{ width: 45, height: 45, borderRadius: 24 }}
            />
          </View>
          <View style={{ marginLeft: 10, justifyContent: "space-around" }}>
            <Text style={[styles.welcomeText, { color: darkTheme.textColor }]}>
              Welcome {localUsername ? localUsername : "back"}!
            </Text>
            <Text
              style={[styles.dateText, { color: darkTheme.textColor }]}
            >{`${day}, ${date} ${month}`}</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for article..."
            style={styles.searchTextInput}
          />
          <View style={styles.searchIcon}>
            <Ionicons name="search" color={"#fff"} size={16} />
          </View>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const isFocused = stateIndex === index;
            return (
              <CategoriesBtn
                {...{ item, updateCat, index, categories, isFocused }}
              />
            );
          }}
          horizontal
          style={{
            flexGrow: 0,
            height: 25,
            marginVertical: 10,
            marginBottom: 15,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TopTab({ route }) {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Trending" component={HomePage} />
      <Tab.Screen name="Story" component={Story} />
      <Tab.Screen name="Politics" component={Politics} />
      <Tab.Screen name="Sports" component={Sports} />
      <Tab.Screen name="Technology" component={Technology} />
      <Tab.Screen name="Science" component={Science} />
      <Tab.Screen name="Video" component={Video} />
      <Tab.Screen name="Health" component={Health} />
      <Tab.Screen name="Entertainment" component={Entertainment} />
      <Tab.Screen name="Business" component={Business} />
      <Tab.Screen name="Religion" component={Religion} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontFamily: "osSemiBold",
    fontSize: 12,
  },

  dateText: {
    fontSize: 11,
    fontFamily: "osRegular",
  },

  searchIcon: {
    backgroundColor: "#7C37FA",
    padding: 12,
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    flexDirection: "row",
    marginVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    height: 40,
  },

  searchTextInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontFamily: "osLight",
    fontSize: 13,
  },

  categoryBtn: {
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 10,
    maxHeight: 32,
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#7C37FA",
    borderWidth: 2,
    borderStyle: "solid",
  },

  categoryText: {
    fontFamily: "regular",
    color: "#7C37FA",
  },
});

function CategoriesBtn({ item, updateCat, index, categories, isFocused }) {
  const catRef = useRef(null);
  useEffect(() => {
    if (isFocused) {
      catRef.current.animate({ 0: { scaleX: 0 }, 1: { scaleX: 1.05 } });
    } else {
      catRef.current.animate({ 0: { scaleX: 0 }, 1: { scaleX: 0 } });
    }
  }, [isFocused]);

  return (
    <Pressable
      style={[styles.categoryBtn]}
      onPress={() => updateCat(index, item.name)}
    >
      <Animatable.View
        ref={catRef}
        style={[
          { ...StyleSheet.absoluteFillObject },
          {
            backgroundColor: "#7C37FA",
            borderRadius: 16,
          },
        ]}
        duration={200}
      ></Animatable.View>
      <Text
        style={[
          styles.categoryText,
          {
            color: isFocused ? "#fff" : "#7C37FA",
            fontSize: 11,
          },
        ]}
      >
        {item.name}
      </Text>
    </Pressable>
  );
}
