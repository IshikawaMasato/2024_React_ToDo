import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Routerをインポート
import "@testing-library/jest-dom"; // jest-domのインポート
import Login from "./Login";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})), // getAuth関数をモック
  signInWithEmailAndPassword: jest.fn((auth, email, password) => {
    if (email === "test@example.com" && password === "password123") {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("ログインに失敗しました"));
    }
  }),
}));

// window.alertをモック
global.alert = jest.fn();

describe("Login Component", () => {
  test("successful login", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i })); // ボタンのテキストを確認

    // 非同期処理の完了を待つ
    await waitFor(() => {
      // alertが呼ばれたか確認
      expect(global.alert).toHaveBeenCalledWith("ログインに成功しました");
    });
  });

  test("failed login", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i })); // ボタンのテキストを確認

    // 非同期処理の完了を待つ
    const errorMessage = await screen.findByText(/ログインに失敗しました/i);

    // エラーメッセージが表示されるか確認
    expect(errorMessage).toBeInTheDocument();
  });
});
