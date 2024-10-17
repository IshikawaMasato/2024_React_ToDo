import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login"; // ログインコンポーネントのパスを確認してください

describe("Login Component", () => {
  it("logs in successfully", () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }));

    // 成功時のアサーションを追加してください
  });

  it("shows error message on failed login", () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }));

    // エラーメッセージのアサーションを追加してください
  });
});
