// src/App.tsx
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Signup from "./components/Auth/Signup";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
        </div>
      ) : (
        <div>
          <Signup />
          {/* ログイン画面のコンポーネントをここに追加予定 */}
        </div>
      )}
    </div>
  );
};

export default App;
