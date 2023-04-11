import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { Database } from "../constants/Context";

const SmallCard = ({ item }) => {
  const navigation = useNavigation();
  const { title, imgUrl, comments, views, publicationDate } = item;
  const { darkTheme } = useContext(Database);

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: darkTheme.cardBgc,
          // shadowColor: darkTheme.shadowColor,
        },
      ]}
      onPress={() => navigation.navigate("details", item)}
    >
      <View style={styles.imgContainer}>
        <SharedElement id={`news${title}`}>
          <Image source={imgUrl} style={styles.img} resizeMode="cover" />
        </SharedElement>
      </View>
      <View style={styles.newInfoContainer}>
        <Text style={[styles.title, { color: darkTheme.textColor }]}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[styles.pubDate, { color: darkTheme.textColor }]}>
            {publicationDate}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="eye" size={15} color="royalblue" />
            <Text
              style={{
                color: "royalblue",
                marginLeft: 5,
                fontFamily: "regular",
                fontSize: 10,
              }}
            >
              {views}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="commenting-o" size={15} color="royalblue" />
            <Text
              style={{
                color: "royalblue",
                marginLeft: 5,
                fontFamily: "regular",
                fontSize: 10,
              }}
            >
              {comments.length}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    flexDirection: "row",
    // elevation: 3,
    // shadowColor: "gray",
  },

  imgContainer: {
    width: 60,
    aspectRatio: 1,
  },

  img: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  newInfoContainer: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "osRegular",
    fontSize: 12,
  },

  pubDate: {
    fontFamily: "osLight",
    fontSize: 11,
  },
});

export default SmallCard;
