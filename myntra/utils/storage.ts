// import * as SecureStore from "expo-secure-store";

// export const saveUserData = async (
//   _id: string,
//   name: string,
//   email: string
// ) => {
//   await SecureStore.setItemAsync("userid", _id);
//   await SecureStore.setItemAsync("userName", name);
//   await SecureStore.setItemAsync("userEmail", email);
// };

// export const getUserData = async () => {
//   const _id = await SecureStore.getItemAsync("userid");
//   const name = await SecureStore.getItemAsync("userName");
//   const email = await SecureStore.getItemAsync("userEmail");
//   return { _id, name, email };
// };

// export const clearUserData = async () => {
//   await SecureStore.deleteItemAsync("userid");
//   await SecureStore.deleteItemAsync("userName");
//   await SecureStore.deleteItemAsync("userEmail");
// };


import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const saveUserData = async (
  _id: string,
  name: string,
  email: string
) => {
  if (Platform.OS === "web") {
    localStorage.setItem("userid", _id);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    return;
  }

  await SecureStore.setItemAsync("userid", _id);
  await SecureStore.setItemAsync("userName", name);
  await SecureStore.setItemAsync("userEmail", email);
};

export const getUserData = async () => {
  if (Platform.OS === "web") {
    const _id = localStorage.getItem("userid");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    return { _id, name, email };
  }

  const _id = await SecureStore.getItemAsync("userid");
  const name = await SecureStore.getItemAsync("userName");
  const email = await SecureStore.getItemAsync("userEmail");

  return { _id, name, email };
};

export const clearUserData = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem("userid");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    return;
  }

  await SecureStore.deleteItemAsync("userid");
  await SecureStore.deleteItemAsync("userName");
  await SecureStore.deleteItemAsync("userEmail");
};