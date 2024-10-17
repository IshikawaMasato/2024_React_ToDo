import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics"; // isSupportedをインポート
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

let analytics; // analyticsを定義するが初期化しない
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app); // サポートされている場合のみ初期化
  }
});

const auth = getAuth(app);
const db = getFirestore(app);

export { analytics, auth, db };
