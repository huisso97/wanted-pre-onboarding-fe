import React, { useCallback } from "react";
import { deleteTodo } from "../../utils/todo";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData }) => {
  const handleCheck = useCallback((id) => {
    deleteTodo(id)
      .then((res) => {
        if (res.status === 204) {
          let newTodoData = todoData.filter((data) => id !== data.id);
          setTodoData(newTodoData);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {todoData?.map((data) => (
        <List handleCheck={handleCheck} key={data.id} data={data} todoData={todoData} setTodoData={setTodoData} />
      ))}
    </div>
  );
});
export default Lists;
