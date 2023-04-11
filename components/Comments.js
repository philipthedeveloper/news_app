import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import Comment from "./Comment";
import { ScrollView } from "react-native-gesture-handler";

const Comments = ({
  currentUserId,
  backendComments,
  deleteComment,
  postId,
  activeState,
  setActiveState,
}) => {
  // console.log(backendComments, currendUserId);
  const rootComments = backendComments.filter(
    (comment) => comment.parentId === null
  );
  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ marginBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {rootComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            replies={getReplies(comment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            postId={postId}
            activeState={activeState}
            setActiveState={setActiveState}
            replyObj={false}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Comments;
