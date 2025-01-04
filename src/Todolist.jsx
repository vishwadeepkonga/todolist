import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const Todolist = () => {
  const [todoDetails, setDetails] = useState({
    id: null,
    task: "",
    completed: false,
  });

  const [todos, setTodo] = useState([]);

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodo(storedTodos);
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleTodo = (e) => {
    setDetails({ id: uuid().slice(0, 8), name: e.target.value, completed: false });
  };

  const handleClick = () => {
    if (todoDetails.name?.trim() === "") return; // Prevent adding empty tasks
    setTodo((prev) => [...prev, todoDetails]);
    setDetails({ id: null, task: "", completed: false }); // Clear input after adding
  };

  const handleCheckbox = (e, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: e.target.checked } : todo
    );
    setTodo(updatedTodos);
  };

  const handleDelete = (deleteItem) => {
    const filteredTodos = todos.filter((item) => item.id !== deleteItem.id);
    setTodo(filteredTodos);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {todos?.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          <input
            type="checkbox"
            checked={item.completed}
            onChange={(e) => handleCheckbox(e, item.id)}
          />
          <div style={{ display: "flex", justifyContent: "center", gap: "5px", alignItems: "center" }}>
            <p>{item.name}</p>
            <span>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </span>
          </div>
        </div>
      ))}
      <div>
        <div>
          <input
            name="todo"
            value={todoDetails.name || ""}
            onChange={(e) => handleTodo(e)}
          />
        </div>
        <button onClick={() => handleClick()}>Add Todo</button>
      </div>
    </div>
  );
};

export default Todolist;
