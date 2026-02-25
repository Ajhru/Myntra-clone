


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





import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENTLY_VIEWED_KEY = "RECENTLY_VIEWED_PRODUCTS";

export const addRecentlyViewed = async (product: any) => {
  try {
    const existing = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
    let items = existing ? JSON.parse(existing) : [];

    // remove duplicate
    items = items.filter((p: any) => p._id !== product._id);

    // add on top
    items.unshift(product);

    // limit to 10 items
    if (items.length > 10) {
      items = items.slice(0, 10);
    }

    await AsyncStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify(items)
    );
  } catch (err) {
    console.log("Recently viewed error", err);
  }
};

export const getRecentlyViewed = async () => {
  try {
    const data = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};