import React, { useState } from "react";
import styled from "styled-components";
import { Btn } from "../../pages/Todo";
import { editTodo } from "../../utils/todo";
import { InputWrapper } from "./Form";

const List = React.memo(({ data, todoData, setTodoData, handleCheck }) => {
  const { id, todo, isCompleted } = data;
  const [completed, setCompleted] = useState(isCompleted);
  const [editTitle, setEditTitle] = useState(todo);
  const [isEditing, setIsEditing] = useState(false);

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.isCompleted = !data.isCompleted;
        setCompleted(!completed);
        editTodo({ todo: data.todo, isCompleted: data.isCompleted, id: data.id });
      }
      return data;
    });
    setTodoData(newTodoData);
  };

  const handleEditChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.todo = editTitle;
        editTodo({ todo: data.todo, isCompleted: data.isCompleted, id: data.id });
      }
      return data;
    });
    setTodoData(newTodoData);
    setIsEditing(false);
  };
  if (isEditing) {
    return (
      <Wrapper>
        <FormWrapper onSubmit={handleSubmit}>
          <InputWrapper value={editTitle} onChange={handleEditChange} placeholder={todo} />
        </FormWrapper>

        <BtnWrapper>
          <Btn onClick={() => handleCheck(id)}>삭제</Btn>
          <Btn onClick={handleSubmit}>저장</Btn>
        </BtnWrapper>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper key={id}>
        <MinWrapper>
          <Input defaultChecked={completed} onChange={() => handleCompleteChange(id)} />
          <Item completed={completed}>{todo}</Item>
        </MinWrapper>
        <BtnWrapper>
          <Btn onClick={() => handleCheck(id)}>삭제</Btn>
          <Btn onClick={() => setIsEditing(true)}>수정</Btn>
        </BtnWrapper>
      </Wrapper>
    );
  }
});

export default List;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.lightBgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  width: 100%;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2px;
`;

const BtnWrapper = styled.div`
  display: flex;
`;

const MinWrapper = styled.div`
  align-items: center;
`;

const Item = styled.span`
  text-decoration: ${(props) => (props.completed ? "line-through" : "")};
  font-size: large;
  font-weight: 600;
  margin-left: 10px;
  color: ${(props) => props.theme.btnTextColor};
`;

const Input = styled.input.attrs({
  type: "checkbox",
})`
  display: inline-block;
  width: 20px;
  height: 16px;
  border: 2px solid #bcbcbc;
  cursor: pointer;
`;
