import { Avatar, Tooltip, Box, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, memo } from "react";
import Lottie from "lottie-react";

import "../App.css";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";
import typingAnimation from "../animations/typing.json";

const ScrollableChat = memo(({ messages, isTyping }) => {
  const { user } = ChatState();
  const messagesEndRef = useRef(null);
  
  // Instagram-like colors
  const messageSentBg = useColorModeValue("blue.500", "#0095F6"); // Instagram blue
  const messageReceivedBg = useColorModeValue("gray.100", "#262626"); // Instagram dark gray
  const messageTextColor = useColorModeValue("gray.800", "#E4E6EB"); // Instagram light text
  const chatBg = useColorModeValue("white", "#121212"); // Instagram dark background

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box p={3} display="flex" flexDirection="column" gap={3} bg={chatBg}>
      {messages?.map((m, i) => (
        <Box key={m._id} display="flex">
          {(isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id)) && (
            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.sender.name}
                src={m.sender.pic}
              />
            </Tooltip>
          )}
          <Box
            bg={m.sender._id === user._id ? messageSentBg : messageReceivedBg}
            color={m.sender._id === user._id ? "white" : messageTextColor}
            ml={isSameSenderMargin(messages, m, i, user._id)}
            mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
            borderRadius="20px"
            p="5px 15px"
            maxW="75%"
            boxShadow="sm"
            _hover={{
              boxShadow: "md",
              transition: "all 0.2s ease-in-out"
            }}
          >
            {m.content}
          </Box>
        </Box>
      ))}
      {isTyping && (
        <Box display="flex" alignItems="center" ml={3}>
          <Lottie
            animationData={typingAnimation}
            loop={true}
            style={{ width: 70, marginBottom: 15, marginLeft: 0 }}
          />
        </Box>
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
});

ScrollableChat.displayName = "ScrollableChat";

export default ScrollableChat;
