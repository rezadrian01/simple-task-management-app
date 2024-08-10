import { createSlice, configureStore } from "@reduxjs/toolkit";

const taskSlices = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        ...action.payload.task,
      });
    },
    removeTask: (state, action) => {
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      state.tasks = filteredTasks;
    },
    replaceTask: (state, action) => {
      const tasks = [...action.payload.tasks];
      state.tasks = tasks;
    },
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: "tasks",
  reducers: {
    tasks: (state, action) => {
      state = "tasks";
      return state;
    },
    completedTask: (state, action) => {
      state = "completedTask";
    },
    failedTask: (state, action) => {
      state = "failedTask";
    },
    changeMenu: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const store = configureStore({
  reducer: { tasks: taskSlices.reducer, ui: uiSlice.reducer },
});

export default store;

export const taskAction = taskSlices.actions;
export const uiAction = uiSlice.actions;
