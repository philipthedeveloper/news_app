import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Database } from "../constants/Context";

const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  postId,
  activeState,
  setActiveState,
  replyObj,
}) => {
  const { darkTheme: theme, isDarkTheme } = useContext(Database);
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = currentUserId !== comment.username;
  const canEdit = currentUserId === comment.username && !timePassed;
  const canDelete = currentUserId === comment.username && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const replyId = comment.parentId !== null ? comment.parentId : comment.id;

  return (
    <View>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <View style={styles.imgContainer}>
          <Image
            source={require("../assets/jpegs/avatar.png")}
            resizeMode="contain"
            style={styles.commentImg}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 15,
            justifyContent: "space-around",
          }}
        >
          <View style={styles.commentInfo}>
            <Text style={[styles.commentInfoContent, { color: "#efefef" }]}>
              {comment.username}.
            </Text>
            <Text style={styles.createdAt}>{createdAt}</Text>
          </View>
          <View>
            {replyObj && (
              <Text
                style={{
                  fontFamily: "osRegular",
                  color: "#efefef",
                  fontSize: 8,
                  marginBottom: 2,
                }}
              >
                {`Replying to @${comment.replyTo}`}
              </Text>
            )}
            <Text style={[styles.commentBody, { color: theme.textColor }]}>
              {comment.body}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            {canReply && (
              <Pressable
                style={styles.actionBtn}
                onPress={() =>
                  setActiveState({
                    type: "replying",
                    id: replyId,
                    author: comment.username,
                    initialText: "",
                  })
                }
              >
                <Text
                  style={[
                    styles.actionTxt,
                    { color: isDarkTheme ? "yellow" : "#fff" },
                  ]}
                >
                  Reply
                </Text>
              </Pressable>
            )}
            {canEdit && (
              <Pressable
                style={styles.actionBtn}
                onPress={() =>
                  setActiveState({
                    type: "editing",
                    id: comment.id,
                    author: comment.username,
                    initialText: comment.body,
                  })
                }
              >
                <Text
                  style={[
                    styles.actionTxt,
                    { color: isDarkTheme ? "yellow" : "#fff" },
                  ]}
                >
                  Edit
                </Text>
              </Pressable>
            )}
            {canDelete && (
              <Pressable
                style={styles.actionBtn}
                onPress={() => deleteComment(comment.id, postId)}
              >
                <Text
                  style={[
                    styles.actionTxt,
                    { color: isDarkTheme ? "yellow" : "#fff" },
                  ]}
                >
                  Delete
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
      {replies.length > 0 && (
        <View style={{ marginLeft: 30 }}>
          {replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply.id}
              replies={[]}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              postId={postId}
              activeState={activeState}
              setActiveState={setActiveState}
              replyObj={true}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },

  imgContainer: {
    width: 40,
    height: 40,
  },
  commentInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  commentInfoContent: {
    fontFamily: "regular",
    fontSize: 12,
  },

  createdAt: {
    color: "gray",
    fontFamily: "light",
    fontSize: 10,
    marginLeft: 5,
  },

  commentBody: {
    fontFamily: "abel",
    fontSize: 11,
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  actionBtn: {
    marginRight: 15,
  },

  actionTxt: {
    fontFamily: "regular",
    fontSize: 10,
    color: "#fff",
  },
});

export default Comment;
