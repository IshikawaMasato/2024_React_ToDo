import React from "react";
import Logout from "../Auth/Logout"; // Logoutコンポーネントをインポート
import AddTodo from "./AddToDo";

const ToDoList: React.FC = () => {
  return (
    <div>
      タスク登録
      <AddTodo />
      <h1>一覧画面</h1>
      <Logout /> {/* ログアウトボタンを追加 */}
    </div>
  );
};

export default ToDoList;
