import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP8F4FQ5nXhsAAAzjBF0XkAfElQorXNmw",
  authDomain: "musicstreamauth.firebaseapp.com",
  projectId: "musicstreamauth",
  storageBucket: "musicstreamauth.appspot.com",
  messagingSenderId: "1011570718317",
  appId: "1:1011570718317:web:0528aa2dafbd3defc63164",
};
// initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
export const db = getFirestore(app);
export default app;
