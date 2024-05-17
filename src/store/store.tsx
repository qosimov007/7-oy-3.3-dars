import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./todos-slice";

export const store = configureStore({
    reducer: {
        todos: TodoReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
