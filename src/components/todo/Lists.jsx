import React, { useCallback } from "react";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData }) => {
  const handleCheck = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => id !== data.id);
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [todoData]
  );

  return (
    <div>
      {todoData.map((data, index) => (
        <List handleCheck={handleCheck} key={data.id} id={data.id} title={data.title} completed={data.completed} todoData={todoData} setTodoData={setTodoData} />
      ))}
    </div>
  );
});
export default Lists;
