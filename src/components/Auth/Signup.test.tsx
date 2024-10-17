import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Signup from "./Signup";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

jest.mock("firebase/auth");

describe("Signup Component", () => {
  it("登録成功で200が返る", async () => {
    // モック関数で登録処理が成功した場合を想定
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { email: "test@example.com" },
    });

    render(<Signup />);

    // Email入力フィールドを取得し、値を入力
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Password入力フィールドを取得し、値を入力
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Confirm Password入力フィールドを取得し、値を入力
    const confirmPasswordInput = screen.getByPlaceholderText("ConfirmPassword");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    // 登録ボタンを取得し、クリックイベントを発生させる
    const signupButton = screen.getByText("Sign Up");
    fireEvent.click(signupButton);

    // 登録が成功したことを確認
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "password123"
    );

    // 200が返る（成功アラートが表示される）ことを確認
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // 非同期処理を待つ
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("User registered successfully");
    });

    // モックのクリーンアップ
    alertSpy.mockRestore();
  });
});

// 環境変数のテスト
test("Firebase projectIdが設定されているか", () => {
  console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID); // 環境変数の値を出力
  expect(process.env.REACT_APP_FIREBASE_PROJECT_ID).toBeDefined(); // projectId が定義されているか確認
});
