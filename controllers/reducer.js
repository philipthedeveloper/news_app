import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";
import { ToastAndroid } from "react-native";

const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "addComment":
      const updatedState = handleAdding(state, payload);
      return updatedState;
    case "delete":
      const newState = handleDeleting(state, payload);
      return newState;
    case "reply":
      const modifiedState = handleReply(state, payload);
      return modifiedState;
    case "edit":
      const editedState = handleEdit(state, payload);
      return editedState;
    default:
      console.log("default called");
      return state;
  }
};

const handleAdding = (state, { text, parentId, username, postId }) => {
  const { prevState, i } = miniHandler(state, postId);
  const newComment = createComment(text, parentId, username);
  prevState[i].comments.unshift(newComment);
  return prevState;
};

const handleDeleting = (state, { commentId, postId }) => {
  const { prevState, i } = miniHandler(state, postId);
  const prevComments = prevState[i].comments;
  prevState[i].comments = prevComments.filter(
    (comment) => comment.id !== commentId
  );
  return prevState;
};

const handleReply = (state, { text, replyTo, parentId, postId, username }) => {
  const { prevState, i } = miniHandler(state, postId);
  const newComment = createReply(text, parentId, username, replyTo);
  prevState[i].comments.push(newComment);
  return prevState;
};

const handleEdit = (state, { text, commentId, postId }) => {
  const { prevState, i } = miniHandler(state, postId);
  const newComment = prevState[i].comments.map((comment) => {
    if (comment.id === commentId) {
      return { ...comment, body: text };
    } else {
      return comment;
    }
  });
  prevState[i].comments = newComment;
  return prevState;
};

const miniHandler = (state, postId) => {
  const prevState = [...state];
  const activePost = getComment(state, postId);
  const i = prevState.indexOf(activePost);
  return { prevState, i };
};

const createComment = (text, parentId = null, username) => {
  return {
    id: Math.random().toString().substr(2, 9),
    body: text,
    parentId,
    username,
    createdAt: new Date().toISOString(),
  };
};

const createReply = (text, parentId = null, username, replyTo) => {
  return {
    id: Math.random().toString().substr(2, 9),
    body: text,
    parentId,
    username,
    createdAt: new Date().toISOString(),
    replyTo,
  };
};

const getComment = (state, postId) => {
  return state.find((post) => post.id === postId);
};

const savedReducer = (state, action) => {
  switch (action.type) {
    case "save":
      AsyncStorage.setItem(
        "saved",
        JSON.stringify([...state, action.payload])
      ).then(() => {
        ToastAndroid.showWithGravity(
          "Saved",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
      return [...state, action.payload];
    case "unsave":
      const newSaved = state.filter(
        (savedItem) => savedItem.title !== action.payload.title
      );
      AsyncStorage.setItem("saved", JSON.stringify(newSaved)).then(() => {
        ToastAndroid.showWithGravity(
          "Unsaved",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
      return newSaved;
    case "fromStorage":
      return [...action.payload];
    default:
      return state;
  }
};

export { reducer, savedReducer };
