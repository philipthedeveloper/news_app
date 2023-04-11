import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { Database } from "../constants/Context";

const FullCard = ({ item }) => {
  const navigation = useNavigation();
  const {
    title,
    description,
    imgUrl,
    comments,
    views,
    publicationDate,
    author,
  } = item;

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
      <View style={styles.newsImgCont}>
        <SharedElement id={`news${title}`}>
          <Image source={imgUrl} resizeMode="cover" style={styles.newsImg} />
        </SharedElement>
      </View>
      <View style={styles.newsInfoCont}>
        <Text style={[styles.titleText, { color: darkTheme.textColor }]}>
          {title}
        </Text>
        <View style={styles.pubInfoCont}>
          <Image
            source={require("../assets/jpegs/avatar.png")}
            resizeMode="contain"
            style={styles.authorImg}
          />
          <View style={styles.pubInfo}>
            <Text style={[styles.authorName, { color: darkTheme.textColor }]}>
              {author}
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
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    aspectRatio: 1.1,
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    // elevation: 3,
    // shadowColor: "gray",
  },

  newsImg: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  newsImgCont: {
    width: "100%",
    aspectRatio: 1.6,
  },

  newsInfoCont: {
    flex: 1,
    marginTop: 8,
    justifyContent: "space-between",
  },

  titleText: {
    fontFamily: "osRegular",
    fontSize: 15,
    lineHeight: 20,
  },

  authorImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },

  pubInfoCont: {
    flexDirection: "row",
    alignItems: "center",
  },

  pubInfo: {
    marginLeft: 10,
    alignSelf: "stretch",
    justifyContent: "space-around",
    flex: 1,
  },

  authorName: {
    fontFamily: "osLight",
    fontSize: 13,
  },

  pubDate: {
    fontFamily: "regular",
    fontSize: 11,
  },
});

export default FullCard;
