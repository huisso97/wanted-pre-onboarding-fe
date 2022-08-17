import { tokenAxios } from "../api";

export const createTodo = async (data) => {
  return await tokenAxios.post("/todos", data);
};

export const getTodo = async () => {
  return await tokenAxios.get("/todos");
};

export const editTodo = async (data) => {
  const { todo, isCompleted, id } = data;
  return await tokenAxios.put(`/todos/${id}`, { todo, isCompleted });
};

export const deleteTodo = async (id) => {
  return await tokenAxios.delete(`/todos/${id}`);
};
