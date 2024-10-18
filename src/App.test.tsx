import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Signup from "./components/Auth/Signup";
import Logout from "./components/Auth/Logout";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { email: "test@example.com" },
  })),
  signOut: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe("Signup Component", () => {
  const setup = () => {
    render(<Signup />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("ConfirmPassword");
    const signupButton = screen.getByText("Sign Up");
    return { emailInput, passwordInput, confirmPasswordInput, signupButton };
  };

  it("登録成功で200が返る", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { email: "test@example.com" },
    });

    const { emailInput, passwordInput, confirmPasswordInput, signupButton } =
      setup();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(signupButton);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object), // auth
      "test@example.com",
      "password123"
    );

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("User registered successfully");
    });

    alertSpy.mockRestore();
  });

  it("パスワードが一致しない場合、エラーメッセージが表示される", () => {
    const { emailInput, passwordInput, confirmPasswordInput, signupButton } =
      setup();

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password456" },
    });
    fireEvent.click(signupButton);

    expect(alertSpy).toHaveBeenCalledWith("Passwords do not match");

    alertSpy.mockRestore();
  });

  it("登録失敗でエラーメッセージが表示される", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error("Registration failed")
    );

    const { emailInput, passwordInput, confirmPasswordInput, signupButton } =
      setup();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(signupButton);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Registration failed");
    });

    alertSpy.mockRestore();
  });
});

describe("Logout Component", () => {
  it("ログアウトが成功するか", async () => {
    render(<Logout />);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.click(screen.getByText("Logout"));

    expect(signOut).toHaveBeenCalled();

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("User logged out successfully");
    });

    alertSpy.mockRestore();
  });
});

// ToDo追加のテスト
describe("AddTodo Component", () => {
  it("タスクを追加するとリストに表示される", async () => {
    const { default: AddTodo } = await import("./components/ToDo/AddToDo");
    const { default: TodoList } = await import("./components/ToDo/ToDoList");

    render(
      <>
        <AddTodo />
        <TodoList />
      </>
    );

    const taskInput = screen.getByPlaceholderText("タスクのタイトルを入力");
    const addButton = screen.getByText("追加");

    fireEvent.change(taskInput, { target: { value: "新しいタスク" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("新しいタスク")).toBeInTheDocument();
    });
  });

    it("空のToDoを追加しようとするとエラーメッセージが表示される", async () => {
      const { default: AddTodo } = await import("./components/ToDo/AddToDo");

      render(<AddTodo />);

      const addButton = screen.getByText("追加");

      const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

      fireEvent.click(addButton);

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith("タスク追加エラー");
      });

      alertSpy.mockRestore();
    });
  });

  it("空のToDoを追加しようとするとエラーメッセージが表示される", async () => {
    const { default: AddTodo } = await import("./components/ToDo/AddToDo");

    render(<AddTodo />);

    const addButton = screen.getByText("追加");

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("タスク追加エラー");
    });

    alertSpy.mockRestore();
  });

// 環境変数のテスト
test("Firebase projectIdが設定されているか", () => {
  console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID); // 環境変数の値を出力
  expect(process.env.REACT_APP_FIREBASE_PROJECT_ID).toBeDefined(); // projectId が定義されているか確認
});
