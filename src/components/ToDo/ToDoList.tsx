import React from "react";
import Logout from "../Auth/Logout"; // Logoutコンポーネントをインポート
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const fetchTodos = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, "todos"),
        where("user_id", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      setTodos(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEditClick = (id: any) => {
    setEditingTodoId(id);
  };

  const handleEditCancel = () => {
    setEditingTodoId(null);
  };

  return (
    <div>
      <h1>一覧画面</h1>
      <Logout /> {/* ログアウトボタンを追加 */}
    </div>
  );
};

export default ToDoList;
