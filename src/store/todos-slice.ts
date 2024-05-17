import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface TodoState {
//     todos: { [id: number; name: string; completed: boolean] };
// }

export interface TodosType {
    id: number;
    name: string;
    completed: boolean;
}

const todos = localStorage.getItem("todos") || [];

let parsed;

if (typeof todos === "string") {
    parsed = JSON.parse(todos);
}

const initialState: TodosType[] = parsed || [];

const TodoSlice = createSlice({
    name: "todo",
    initialState: { value: initialState },
    reducers: {
        addTodo: (state, action) => {
            state.value.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.value = state.value.filter(
                (item) => item.id != action.payload.id
            );
        },
        completeTodo: (state, action) => {
            state.value.map((item) => {
                if (item.id == action.payload.id) {
                    item.completed = !item.completed;
                }
            });
        },
        clearCompleted: (state, action) => {
            state.value = state.value.filter((item) => item.completed == false);
        },
    },
});

export const { addTodo, deleteTodo, completeTodo, clearCompleted } =
    TodoSlice.actions;

export default TodoSlice.reducer;
