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

const store = configureStore({
  reducer: { tasks: taskSlices.reducer },
});

export default store;
