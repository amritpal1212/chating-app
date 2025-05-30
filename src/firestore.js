import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase";

// Users Collection
export const createUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...userData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Chats Collection
export const createChat = async (chatData) => {
  try {
    const docRef = await addDoc(collection(db, "chats"), {
      ...chatData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserChats = (userId, callback) => {
  const q = query(
    collection(db, "chats"),
    where(`users.${userId}`, "==", true)
  );

  return onSnapshot(q, (snapshot) => {
    const chats = [];
    snapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() });
    });
    callback(chats);
  });
};

// Messages Collection
export const sendMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...messageData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getChatMessages = (chatId, callback) => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });
};

export const updateMessage = async (messageId, updateData) => {
  try {
    const messageRef = doc(db, "messages", messageId);
    await updateDoc(messageRef, updateData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteMessage = async (messageId) => {
  try {
    const messageRef = doc(db, "messages", messageId);
    await deleteDoc(messageRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}; 