import React, { useState } from "react";
import styled from "styled-components";
import Form from "../components/todo/Form";
import Lists from "../components/todo/Lists";
import { removeToken } from "../utils/token";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

function Todo() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));

    console.log(todoData);
    setValue("");
  };

  const deleteAll = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };
  return (
    <Container>
      <button
        onClick={() => {
          removeToken();
          window.location.reload();
        }}
      >
        로그아웃
      </button>
      <Box>
        <Upper>
          <Title>할 일 목록</Title>
          <Btn onClick={deleteAll}>전체 삭제</Btn>
        </Upper>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form setValue={setValue} value={value} handleSubmit={handleSubmit} />
      </Box>
    </Container>
  );
}

export default Todo;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.bgColor};
`;

const Box = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  padding: 10px;
  width: 50%;
  border-radius: 10px;
  box-shadow: 10px;
`;

const Upper = styled.div`
  margin-bottom: 7px;
  display: flex;
  justify-content: space-between;
  margin-left: 5px;
`;

export const Title = styled.h1`
  font-size: x-large;
  font-weight: 600;
`;

export const Btn = styled.button`
  background-color: ${(props) => props.theme.lightBgColor};
  border-radius: 10px;
  margin-left: 5px;
  border-color: ${(props) => props.theme.lightBgColor};
  padding: 8px 12px;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.bgColor};
    transition: background-color 0.2s ease-in;
  }
`;
