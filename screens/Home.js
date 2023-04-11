import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import BigCard from "../components/BigCard";
import SmallCard from "../components/SmallCard";
import FullCard from "../components/FullCard";
import { Database } from "../constants/Context";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const HomeStack = createSharedElementStackNavigator();

const Home = () => {
  const { newsData: dummyData, darkTheme } = useContext(Database);

  return (
    <View
      style={{
        backgroundColor: darkTheme.bgc,
        flex: 1,
        paddingHorizontal: 14,
        position: "relative",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <FlatList
            data={dummyData.slice(0, 5)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <BigCard item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{ marginVertical: 10, flexGrow: 0 }}>
          {dummyData.map((item, index) => {
            if (item.type === "full") {
              return <FullCard item={item} key={index.toString()} />;
            } else if (item.type === "small") {
              return <SmallCard item={item} key={index.toString()} />;
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};

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
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  searchContainer: {
    flexDirection: "row",
    marginVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },

  searchTextInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontFamily: "regular",
  },

  categoryBtn: {
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 10,
    maxHeight: 32,
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

const HomePage = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="first" component={Home} />
    </HomeStack.Navigator>
  );
};

export { HomePage };

export default Home;
