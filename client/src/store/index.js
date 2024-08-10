import { createSlice, configureStore } from "@reduxjs/toolkit";

const taskSlices = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push({
        ...action.payload.task,
      });
    },
    removeTask(state, action) {
      const filteredTasks = state.tasks.filter(
        (task) => task._id !== action.payload
      );
      state.tasks = filteredTasks;
    },
    completedTask(state, action) {
      const existingTaskIndex = state.tasks.findIndex(
        (task) => task._id === action.payload
      );
      state.tasks[existingTaskIndex].status = "completed";
    },
    incompletedTask(state, action) {
      const existingTaskIndex = state.tasks.findIndex(
        (task) => task._id === action.payload
      );
      state.tasks[existingTaskIndex].status = "incompleted";
    },
    replaceTask(state, action) {
      const tasks = [...action.payload.tasks];
      state.tasks = tasks;
    },
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: "process",
  reducers: {
    tasks(state, action) {
      state = "tasks";
      return state;
    },
    process(state, action) {
      state = "process";
      return state;
    },
    completedTask(state, action) {
      state = "completedTasks";
      return state;
    },
    failedTask(state, action) {
      state = "failedTasks";
      return state;
    },
    changeMenu(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const store = configureStore({
  reducer: { tasks: taskSlices.reducer, ui: uiSlice.reducer },
});

export default store;

export const tasksAction = taskSlices.actions;
export const uiAction = uiSlice.actions;
