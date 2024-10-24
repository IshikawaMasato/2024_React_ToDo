import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ToDoList from "./ToDoList";
import { getDocs } from "firebase/firestore";
import "@testing-library/jest-dom/";

// Mock Firebase dependencies
jest.mock("../../firebase", () => ({
  auth: {
    currentUser: { uid: "test-user-id" },
  },
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

const mockTodos = [
  {
    id: "1",
    title: "Test Todo 1",
    priority: "High",
    deadline: "2023-12-31",
    reminder: "2023-12-30",
    tags: ["work"],
    subtasks: ["subtask1"],
    sharedWith: ["user1"],
    completed: false,
    created_at: "2023-01-01",
    updated_at: "2023-01-02",
  },
];

describe("ToDoList Component", () => {
  beforeEach(() => {
    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockTodos.map((todo) => ({
        id: todo.id,
        data: () => todo,
      })),
    });
  });

  it("ToDoListコンポーネントのレンダリング", async () => {
    render(<ToDoList />);
    await waitFor(() => {
      const elements = screen.getAllByText("一覧画面");
      expect(elements.length).toBeGreaterThan(0); // 要素が複数存在することを確認
    });
  });

  it("ToDoを取得し表示する", async () => {
    render(<ToDoList />);
    await waitFor(() => {
      mockTodos.forEach((todo) => {
        expect(screen.getByText(todo.title)).toBeInTheDocument();
      });
    });
  });

  it("正しくToDoの詳細が表示される", async () => {
    render(<ToDoList />);
    await waitFor(() => {
      mockTodos.forEach((todo) => {
        expect(screen.getByText(todo.title)).toBeInTheDocument();
        expect(screen.getByText(todo.priority)).toBeInTheDocument();
        expect(screen.getByText(todo.deadline)).toBeInTheDocument();
        expect(screen.getByText(todo.reminder)).toBeInTheDocument();
        expect(screen.getByText(todo.tags.join(", "))).toBeInTheDocument();
        expect(screen.getByText(todo.subtasks.join(", "))).toBeInTheDocument();
        expect(
          screen.getByText(todo.sharedWith.join(", "))
        ).toBeInTheDocument();
        expect(
          screen.getByText(todo.completed ? "完了" : "未完了")
        ).toBeInTheDocument();
        expect(screen.getByText(todo.created_at)).toBeInTheDocument();
        expect(screen.getByText(todo.updated_at)).toBeInTheDocument();
      });
    });
  });
});
