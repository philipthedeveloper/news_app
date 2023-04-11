import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useMemo, useRef, useState, useCallback } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Database } from "../constants/Context";
import { date, dateGetter } from "../constants/date";
import { SharedElement } from "react-navigation-shared-element";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import Comments from "../components/Comments";
import CommentForm from "../components/CommentForm";

const Details = ({ navigation, route }) => {
  const {
    dispatchSaved,
    saved,
    darkTheme: theme,
    isDarkTheme,
    username,
    addComment,
    deleteComment,
    replyComment,
    editComment,
  } = React.useContext(Database);
  const item = route.params;
  const isSafed = saved.filter((savedItem) => savedItem.title === item.title);

  const {
    id,
    title,
    description,
    author,
    imgUrl,
    publicationDate,
    views,
    comments,
  } = item;
  const bottomSheetRef = useRef(null);
  const [sheetIndex, setSheetIndex] = useState(-1);
  const snapPoints = useMemo(() => ["60%"], []);
  const [activeState, setActiveState] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [initialText, setInitialText] = useState("");

  const activeStateSetter = (data) => {
    setActiveState(data);
    if (data !== null) {
      setInitialText(data.initialText);
    } else {
      setInitialText("");
    }
    setIsFocused(true);
  };

  // useFocusEffect(() => {
  //   return () => {
  //     bottomSheetRef.current.close();
  //   };
  // });

  const localAddComment = (text, parentId, postId) => {
    addComment(text, parentId, postId);
    setSheetIndex(0);
  };

  const handleSheetChanges = useCallback((index) => {
    setSheetIndex(index);
  }, []);

  const handleSave = () => {
    const { date, day, month, year } = dateGetter();
    dispatchSaved({
      type: "save",
      payload: { ...item, savedOn: `${day}, ${date} ${month} ${year}` },
    });
  };

  const handleUnsave = async () => {
    dispatchSaved({ type: "unsave", payload: item });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bgc }}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />
      <View style={{ backgroundColor: theme.customHead, position: "relative" }}>
        <SharedElement id={`news${title}`}>
          <Image source={imgUrl} style={styles.img} resizeMode="cover" />
        </SharedElement>
        <View
          style={{
            position: "absolute",
            top: 0,
            height: 100,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: StatusBar.currentHeight + 10,
            paddingHorizontal: 14,
            right: 0,
            left: 0,
          }}
        >
          <Pressable
            style={[styles.pressIcon, { flexDirection: "row" }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" color={"#fff"} size={20} />
          </Pressable>
          {isSafed.length > 0 ? (
            <Pressable style={styles.pressIcon} onPress={handleUnsave}>
              <Ionicons name={"bookmark"} size={18} color={"#fff"} />
            </Pressable>
          ) : (
            <Pressable style={styles.pressIcon} onPress={handleSave}>
              <Ionicons name={"bookmark-outline"} size={18} color={"#fff"} />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.newDetails}>
        <View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            {
              backgroundColor: theme.bgc,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              top: -35,
            },
          ]}
        ></View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Image
              source={require("../assets/jpegs/user.png")}
              resizeMode="contain"
              style={styles.authorImg}
            />
          </View>
          <View style={styles.pubInfo}>
            <Text style={[styles.authorName, { color: theme.textColor }]}>
              {author}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[styles.pubDate, { color: theme.textColor }]}>
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
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                }}
                onPress={() => setSheetIndex(0)}
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
              </Pressable>
            </View>
          </View>
        </View>
        <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={imgUrl} resizeMode="cover" style={styles.newImg} />
          <Text style={[styles.newsDesc, { color: theme.textColor }]}>
            {description}
          </Text>
        </ScrollView>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={sheetIndex}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        style={styles.bottomSheetStyle}
        backgroundStyle={{
          backgroundColor: isDarkTheme ? theme.bottomSheetBgc : "#7C37FA",
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
              color: "#efefef",
            }}
          >
            Swipe Down to Close
          </Text>
          <Text style={[styles.commentHeader, { color: "#efefef" }]}>
            Comments
          </Text>
          <Comments
            currentUserId={username}
            backendComments={comments}
            postId={id}
            deleteComment={deleteComment}
            activeState={activeState}
            setActiveState={activeStateSetter}
          />
        </View>
      </BottomSheet>
      <View>
        <CommentForm
          submitLabel="Post"
          handleSubmit={localAddComment}
          postId={id}
          activeState={activeState}
          handleReply={replyComment}
          setActiveState={activeStateSetter}
          isFocused={isFocused}
          initialText={initialText}
          handleEdit={editComment}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 220,
  },

  newDetails: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },

  newsDesc: {
    fontSize: 16,
    fontFamily: "abel",
    lineHeight: 32,
    textAlign: "justify",
    marginVertical: 10,
  },

  title: {
    fontSize: 20,
    fontFamily: "osBold",
    marginVertical: 10,
  },

  authorImg: {
    width: 60,
    height: 60,
  },

  pubInfo: {
    marginLeft: 10,
    alignSelf: "stretch",
    justifyContent: "space-around",
    flex: 1,
  },

  authorName: {
    fontFamily: "medium",
    fontSize: 13,
  },

  pubDate: {
    fontFamily: "regular",
    fontSize: 11,
  },

  pressIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  newImg: {
    width: "100%",
    height: 200,
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

  commentHeader: {
    fontFamily: "osBold",
  },
});

// Details.SharedElement = (route) => {
//   const { title } = route.params;
//   console.log(title);
//   return [{ id: `news${title}` }];
// };

export default Details;
