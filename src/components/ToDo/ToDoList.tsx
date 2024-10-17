import React from "react";
import Logout from "../Auth/Logout"; // Logoutコンポーネントをインポート

const ToDoList: React.FC = () => {
  return (
    <div>
      <h1>一覧画面</h1>
      <Logout /> {/* ログアウトボタンを追加 */}
    </div>
  );
};

export default ToDoList;
