// import Footer from "../../layout/Footer";
// import Header from "../../layout/Header";

import { useEffect, useState } from "react";
import instance from "./api/instance";
import styles from "./pages/TodoList/TodoList.module.css";

function App() {
  const [data, setData] = useState<{ items: TodoItem[] | undefined }>();

  async function fetchData() {
    try {
      const response = await instance.get<TodoListResponse>("/");
      console.log(response.data);
      setData(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckTodo = function (id: number) {
    setData((prevData) => {
      const updatedItems = prevData?.items?.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            done: !item.done,
          };
        }
        return item;
      });
      return { ...prevData, items: updatedItems };
    });
  };

  const handleTodoEdit = function (e) {
    e.preventDefault();
    console.log("수정");
  };

  const handleTodoDelete = function (e) {
    e.preventDefault();
    console.log("삭제");
  };

  return (
    <>
      <div id={styles.content}>
        <ul className={styles.todoList}>
          {data?.items?.map((item, i) => {
            return (
              <li key={`${item._id}-${i}`} className={styles.todoListItem}>
                <div className={styles.itemWrapper}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckTodo(item._id)}
                    checked={item.done}
                  />
                  <a
                    className={
                      item.done ? styles.doneItemLink : styles.undoItemLink
                    }
                    href=""
                  >
                    {item.title}
                  </a>
                </div>
                <div className={styles.todoActionWrapper}>
                  <a
                    title="수정"
                    className={styles.todoEditLink}
                    href=""
                    onClick={handleTodoEdit}
                  >
                    {/* <i className={styles.far}>수정</i> */}
                    <i className="far, fa-pen-to-square">수정</i>
                  </a>
                  <button
                    title="삭제"
                    className={styles.deleteBtn}
                    onClick={handleTodoDelete}
                  >
                    <i className={styles.far}>삭제</i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <a href="" className={styles.registBtn} title="할일등록">
          <i className={styles.far}>등록</i>
        </a>
      </div>
    </>
  );
}

export default App;
