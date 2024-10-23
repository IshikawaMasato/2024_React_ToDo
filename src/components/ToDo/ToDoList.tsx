import React, { useEffect, useState } from "react";
import Logout from "../Auth/Logout"; // Logoutコンポーネントをインポート
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";
import CompleteTodo from "./CompleteTodo";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// Todo型を定義
interface Todo {
  id: string;
  title: string;
  priority: string;
  deadline: string;
  reminder: string;
  tags?: string[];
  subtasks?: string[];
  sharedWith?: string[];
  completed: boolean;
  created_at: string;
  updated_at: string;
}

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const fetchTodos = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, "todos"),
        where("user_id", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Todo[]
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEditClick = (id: string) => {
    setEditingTodoId(id);
  };

  const handleEditCancel = () => {
    setEditingTodoId(null);
  };

  return (
    <div>
      <div>
        <h1>一覧画面</h1>
        <Logout /> {/* ログアウトボタンを追加 */}
      </div>
      <div className="container is-fluid">
        {todos.map((todo) => (
          <div key={todo.id} className="box" style={{ marginBottom: "1rem" }}>
            <>
              <h3 className="title is-4">
                {todo.title}
                <button
                  className="button is-small is-primary ml-2"
                  onClick={() => handleEditClick(todo.id)}
                >
                  編集
                </button>
              </h3>
              <div className="content">
                <div>
                  <strong>優先度:</strong> {todo.priority}
                </div>
                <div>
                  <strong>締め切り日:</strong> {todo.deadline}
                </div>
                <div>
                  <strong>リマインダー:</strong> {todo.reminder}
                </div>
                <div>
                  <strong>タグ:</strong> {todo.tags && todo.tags.join(", ")}
                </div>
                <div>
                  <strong>サブタスク:</strong>{" "}
                  {todo.subtasks && todo.subtasks.join(", ")}
                </div>
                <div>
                  <strong>共有相手:</strong>{" "}
                  {todo.sharedWith && todo.sharedWith.join(", ")}
                </div>
                <div>
                  <strong>ステータス:</strong>{" "}
                  {todo.completed ? "完了" : "未完了"}
                </div>
                <div>
                  <strong>作成日:</strong> {todo.created_at}
                </div>
                <div>
                  <strong>更新日:</strong> {todo.updated_at}
                </div>
              </div>
              <div className="buttons mt-2"></div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
