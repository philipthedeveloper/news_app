import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Pressable,
  Animated,
  ToastAndroid,
} from "react-native";
import React, { useContext, useState } from "react";
import { Database } from "../constants/Context";
import FullCard from "../components/FullCard";
import SmallCard from "../components/SmallCard";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useFocusEffect } from "@react-navigation/native";

const Saved = ({ navigation }) => {
  const { saved, darkTheme, dispatchSaved } = useContext(Database);
  // useFocusEffect(() => {
  //   if (saved.length > 0) {
  //     ToastAndroid.showWithGravity(
  //       "Swipe left on any news to unsave.",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.TOP
  //     );
  //   }
  // });

  const leftSwipe = (item) => {
    return (
      <View
        style={{
          backgroundColor: "royalblue",
          width: 100,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginVertical: 10,
        }}
      >
        <Ionicons
          name="trash"
          color={"#fff"}
          size={30}
          onPress={() => dispatchSaved({ type: "unsave", payload: item })}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkTheme.bgc,
        paddingHorizontal: 14,
        paddingTop: StatusBar.currentHeight + 20,
      }}
    >
      <View style={styles.header}>
        <Pressable
          style={[styles.pressIcon, { backgroundColor: darkTheme.customHead }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" color={darkTheme.textColor} size={20} />
        </Pressable>
        <Text style={[styles.headerText, { color: darkTheme.textColor }]}>
          Saved
        </Text>
        <Pressable
          style={[styles.pressIcon, { backgroundColor: darkTheme.customHead }]}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            color={darkTheme.textColor}
            size={20}
          />
        </Pressable>
      </View>
      {saved.length === 0 ? (
        <View style={styles.noSavedContainer}>
          <Text
            style={[styles.noSavedText, { color: darkTheme.textColor }]}
          >{`📪\nNo saved news...`}</Text>
        </View>
      ) : (
        <React.Fragment>
          <View>
            <Text
              style={{
                fontFamily: "osBold",
                fontSize: 24,
                marginTop: 5,
                color: darkTheme.textColor,
              }}
            >
              Saved News
            </Text>
          </View>
          <FlatList
            data={[...saved].reverse()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (item.type === "full") {
                return (
                  <View style={{ marginVertical: 10, marginBottom: 5 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "bold",
                        color: darkTheme.textColor,
                      }}
                    >
                      Saved on: {item.savedOn}
                    </Text>
                    <Swipeable renderLeftActions={() => leftSwipe(item)}>
                      <FullCard item={item} />
                    </Swipeable>
                  </View>
                );
              } else if (item.type === "small") {
                return (
                  <View style={{ marginVertical: 10, marginBottom: 5 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "bold",
                        color: darkTheme.textColor,
                      }}
                    >
                      Saved on: {item.savedOn}
                    </Text>
                    <Swipeable renderLeftActions={() => leftSwipe(item)}>
                      <SmallCard item={item} />
                    </Swipeable>
                  </View>
                );
              }
            }}
            showsVerticalScrollIndicator={false}
          />
        </React.Fragment>
      )}
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
  noSavedText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "osBold",
  },

  noSavedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Saved;
