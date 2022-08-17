import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "../components/todo/Form";
import Lists from "../components/todo/Lists";
import { createTodo, getTodo } from "../utils/todo";

function Todo() {
  const [todoData, setTodoData] = useState();
  const [value, setValue] = useState("");

  useEffect(() => {
    try {
      getTodo().then((res) => {
        if (res.status === 200) {
          setTodoData(res.data);
        }
      });
    } catch (err) {}
  }, [todoData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      createTodo({ todo: value }).then((res) => setTodoData((prev) => [...prev, res.data]));
    } catch (err) {
      console.error(err);
    }

    setValue("");
  };

  return (
    <Container>
      <Box>
        <Upper>
          <Title>할 일 목록</Title>
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
