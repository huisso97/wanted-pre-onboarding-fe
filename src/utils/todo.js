import { tokenAxios } from "../api";

export const createTodo = async (body) => {
  return await tokenAxios.post("/todos", body);
};

export const getTodo = async () => {
  return await tokenAxios.get("/todos");
};

export const editTodo = async (body) => {
  const { todo, isCompleted, id } = body;
  return await tokenAxios.put(`/todos/${id}`, { todo, isCompleted });
};

export const deleteTodo = async (id) => {
  return await tokenAxios.delete(`/todos/${id}`);
};
