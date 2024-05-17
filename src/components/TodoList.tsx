import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { deleteTodo, clearCompleted, TodosType } from "../store/todos-slice";
import { RootState } from "../store/store";
import TodoItem from "./TodoItem";
import "./TodoList.css";

export interface ThemeProps {
    colorTheme: string;
}
const Todolist = ({ colorTheme }: ThemeProps) => {
    const [visibleTodos, setVisibleTodos] = useState("all");
    const dispatch = useDispatch();
    const todos = useSelector<RootState, TodosType[]>(
        (state) => state.todos.value
    );

    const activeTodos =
        todos &&
        todos.filter(
            (item: { id: number; name: string; completed: boolean }) => {
                return item.completed == false;
            }
        );
    const completedTodos =
        todos &&
        todos.filter(
            (item: { id: number; name: string; completed: boolean }) => {
                return item.completed == true;
            }
        );

    useEffect(() => {
        todos && localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const currentTodos =
        visibleTodos == "all"
            ? todos
            : visibleTodos == "active"
            ? activeTodos
            : visibleTodos == "completed"
            ? completedTodos
            : todos;

    return (
        <Box className="Card">
            <Box className="todo_list">
                {todos &&
                    currentTodos?.map(
                        (
                            item: {
                                id: number;
                                name: string;
                                completed: boolean;
                            },
                            index: number
                        ) => (
                            <TodoItem
                                deleteHandler={() =>
                                    dispatch(deleteTodo({ id: item.id }))
                                }
                                index={index}
                                key={item.id}
                                id={item.id}
                                completed={item.completed}
                                name={item.name}
                            />
                        )
                    )}
                <Box className="controls" data-theme={colorTheme}>
                    <Box>
                        <span>{currentTodos?.length | 0} items left</span>
                    </Box>
                    <Box className="segregate" data-theme={colorTheme}>
                        <button
                            className={`segregate-btn ${
                                visibleTodos == "all" && "active"
                            }`}
                            id="all"
                            onClick={() => setVisibleTodos("all")}
                        >
                            All
                        </button>
                        <button
                            className={`segregate-btn ${
                                visibleTodos == "active" && "active"
                            }`}
                            id="active"
                            onClick={() => setVisibleTodos("active")}
                        >
                            Active
                        </button>
                        <button
                            className={`segregate-btn ${
                                visibleTodos == "completed" && "active"
                            }`}
                            id="completed"
                            onClick={() => setVisibleTodos("completed")}
                        >
                            Completed
                        </button>
                    </Box>
                    <Box className="clear" data-theme={colorTheme}>
                        <button
                            className="clear-btn"
                            data-theme={colorTheme}
                            onClick={() => dispatch(clearCompleted({ todos }))}
                        >
                            Clear Completed
                        </button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Todolist;
