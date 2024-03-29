import instance from "@/api/instance";
import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Header } from "@/layout/Header/Header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Update.module.css";

export const Update = () => {
  const { todoId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // todoId가 변경될 때마다 해당 Todo의 데이터를 불러오는 함수
  async function fetchTodoData() {
    try {
      const response = await instance.get<TodoResponse>(`/${todoId}`);
      setTitle(response.data.item.title);
      setContent(response.data.item.content);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTodoData(); // 함수 호출
  }, [todoId]); // todoId가 변경될 때마다 useEffect가 실행되도록 설정

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    instance
      .patch(`/${todoId}`, {
        title: title,
        content: content,
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={`${styles.updatePage}`}>
      <Link to="/" className={styles.backBtn}>
        &lt;
      </Link>
      <Header>TODO App 수정</Header>
      <div className={styles.updateContainer}>
        <Input label="제목:" value={title} onChange={handleTitleChange} />
        <Input label="내용:" value={content} onChange={handleContentChange} />
        <Button option="regist" label="수정" onClick={handleSubmit} />
      </div>
    </div>
  );
};
