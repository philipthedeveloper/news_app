import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Database } from "../constants/Context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  postId,
  activeState,
  setActiveState,
  handleReply,
  isFocused,
  initialText,
  handleEdit,
}) => {
  const [text, setText] = useState("");
  const { darkTheme: theme } = useContext(Database);
  const isDisabled = text.length === 0;

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const onSubmit = () => {
    if (activeState === null) {
      handleSubmit(text, null, postId);
      setText("");
    } else if (activeState.type === "replying") {
      handleReply(text, activeState.author, activeState.id, postId);
      setText("");
      setActiveState(null);
    } else if (activeState.type === "editing") {
      handleEdit(text, activeState.id, postId);
      setText("");
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.bottomSheetBgc,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
        minHeight: 70,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: theme.textColor,
              fontFamily: "osBold",
              lineHeight: 18,
            }}
          >
            {activeState?.type === "replying" && `@${activeState.author}`}
          </Text>
          <TextInput
            value={text}
            onChangeText={(value) => setText(value)}
            placeholder="Write a comment..."
            multiline={true}
            placeholderTextColor={theme.textColor}
            style={{
              flex: 1,
              paddingHorizontal: 8,
              color: theme.textColor,
              lineHeight: 18,
            }}
            autoFocus={isFocused}
          />
        </View>
        <Pressable
          style={{
            paddingHorizontal: 10,
            justifyContent: "center",
            height: 35,
          }}
          onPress={onSubmit}
          disabled={isDisabled}
        >
          <FontAwesome
            name="send"
            size={16}
            color={theme.textColor}
            style={{
              opacity: isDisabled ? 0.6 : 1,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default CommentForm;
