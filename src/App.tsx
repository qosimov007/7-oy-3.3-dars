import { createTheme, ThemeProvider, Box, useTheme } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import Todolist from "./components/TodoList";
import { useDispatch } from "react-redux";
import { addTodo } from "./store/todos-slice";
import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [colorTheme, setColorTheme] = useLocalStorage<string>(
    "theme" ? "dark" : "light",
    "dark"
  );

  const addTodoHandler = () => {
    if (!name) {
      alert("You have to entere a name");
      return;
    }
    dispatch(addTodo({ id: Math.random() * 1000, name, completed: false }));
    setName("");
  };

  useEffect(() => {
    let bgLight: string = "hsl(0, 0%, 98%)";
    let bgDark: string = "hsl(235, 21%, 11%)";
    colorTheme == "light"
      ? (document.body.style.backgroundColor = bgLight)
      : (document.body.style.backgroundColor = bgDark);
  }, [colorTheme]);

  return (
    <div className="container" data-theme={colorTheme}>
      <Header colorTheme={colorTheme} setColorTheme={setColorTheme} />
      <Box className="new_todo" data-theme={colorTheme}>
        <Box
          className="checkbox_container"
          sx={{
            width: "2.5rem",
            height: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Box>
        <input
          required
          value={name}
          type="text"
          placeholder="Create a new todo"
          onChange={(e) => setName(e.target.value)}
        />
        <Box>
          <button className="new_todo-btn" onClick={addTodoHandler}>
            Add
          </button>
        </Box>
      </Box>
      <Todolist colorTheme={colorTheme} />
    </div>
  );
};

export default App;
