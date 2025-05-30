import React, { useEffect, useState } from "react";
import { ArrowBackIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
  Flex,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { useChat } from "../context/ChatProvider";
import { getChatMessages, sendMessage } from "../firestore";
import ScrollableChat from "./ScrollableChat";
import "./styles.css";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, setSelectedChat, user, notification, setNotification } = useChat();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (selectedChat) {
      setLoading(true);
      const unsubscribe = getChatMessages(selectedChat._id, (messages) => {
        setMessages(messages);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [selectedChat]);

  const sendMessageHandler = async () => {
    if (newMessage) {
      try {
        setNewMessage("");
        const messageData = {
          chatId: selectedChat._id,
          content: newMessage,
          senderId: user._id,
          senderName: user.name,
          senderPic: user.pic
        };

        const result = await sendMessage(messageData);
        if (!result.success) {
          toast({
            title: "Error sending message",
            description: result.error,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      } catch (error) {
        toast({
          title: "Error sending message",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            bg={colorMode === "dark" ? "brand.dark.card" : "white"}
            borderBottom="1px"
            borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
          >
            <Flex alignItems="center">
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
                mr={2}
                colorScheme={colorMode === "dark" ? "gray" : "blue"}
              />
              {!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                </>
              )}
            </Flex>
            <Tooltip label={colorMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton
                icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                colorScheme={colorMode === "dark" ? "yellow" : "blue"}
              />
            </Tooltip>
          </Box>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg={colorMode === "dark" ? "brand.dark.bg" : "#E8E8E8"}
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <ScrollableChat messages={messages} />
            )}

            <FormControl onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessageHandler();
              }
            }} isRequired mt={3}>
              <Input
                variant="filled"
                bg={colorMode === "dark" ? "brand.dark.card" : "#E0E0E0"}
                placeholder="Enter a message.."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                h="40px"
                _hover={{
                  bg: colorMode === "dark" ? "brand.dark.hover" : "#D0D0D0",
                }}
                _focus={{
                  bg: colorMode === "dark" ? "brand.dark.hover" : "#D0D0D0",
                }}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          bg={colorMode === "dark" ? "brand.dark.bg" : "#E8E8E8"}
        >
          <Text 
            fontSize="3xl" 
            pb={3} 
            fontFamily="Work sans"
            color={colorMode === "dark" ? "brand.dark.text" : "black"}
          >
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
