import React, { useState, ChangeEvent, FormEvent } from "react";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("medium");
  const [deadline, setDeadline] = useState<string>("");
  const [reminder, setReminder] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([""]);
  const [defaultTags] = useState<string[]>([
    "仕事",
    "勉強",
    "趣味",
    "家事",
    "その他",
  ]);
  const [subtasks, setSubtasks] = useState<string[]>([""]);

  const handleAddItem =
    (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[]) =>
    () => {
      setter([...list, ""]);
    };

  const handleRemoveItem =
    (
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      index: number,
      list: string[]
    ) =>
    () => {
      setter(list.filter((_, i) => i !== index));
    };

  const handleChangeItem =
    (
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      index: number,
      list: string[]
    ) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const newList = [...list];
      newList[index] = e.target.value;
      setter(newList);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("タスク追加エラー");
      return;
    }
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "todos"), {
          user_id: user.uid,
          title: title,
          priority: priority,
          deadline: deadline,
          reminder: reminder,
          tags: selectedTags.filter((tag) => tag !== ""),
          subtasks: subtasks.filter((task) => task !== ""),
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        setTitle("");
        setPriority("medium");
        setDeadline("");
        setReminder("");
        setSelectedTags([""]);
        setSubtasks([""]);
        alert("タスクを追加しました");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>タイトル</label>
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タスクのタイトルを入力"
              />
            </div>
          </div>

          <div>
            <label>優先度</label>
            <div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="無し">無し</option>
                <option value="低">低</option>
                <option value="中">中</option>
                <option value="高">高</option>
                <option value="緊急">緊急</option>
              </select>
            </div>
          </div>

          <div>
            <label>締め切り日</label>
            <div>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label>リマインダー</label>
            <div>
              <input
                type="datetime-local"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label>タグ</label>
            {selectedTags.map((tag, index) => (
              <div key={index}>
                <div>
                  <select
                    value={tag}
                    onChange={handleChangeItem(
                      setSelectedTags,
                      index,
                      selectedTags
                    )}
                  >
                    <option value="">タグを選択</option>
                    {defaultTags.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleRemoveItem(
                      setSelectedTags,
                      index,
                      selectedTags
                    )}
                    disabled={selectedTags.length === 1}
                  >
                    −
                  </button>
                </div>
                {index === selectedTags.length - 1 && (
                  <div>
                    <button
                      type="button"
                      onClick={handleAddItem(setSelectedTags, selectedTags)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <label>サブタスク</label>
            {subtasks.map((subtask, index) => (
              <div key={index}>
                <div>
                  <input
                    type="text"
                    value={subtask}
                    onChange={handleChangeItem(setSubtasks, index, subtasks)}
                    placeholder="詳細を入力"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleRemoveItem(setSubtasks, index, subtasks)}
                    disabled={subtasks.length === 1}
                  >
                    −
                  </button>
                </div>
                {index === subtasks.length - 1 && (
                  <div>
                    <button
                      type="button"
                      onClick={handleAddItem(setSubtasks, subtasks)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <div>
              <button type="submit">追加</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
