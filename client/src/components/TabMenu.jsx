import { useDispatch } from "react-redux";

import { uiAction } from "../store";
import TabButton from "./UI/TabButton";

export default function TabMenu() {
  const dispatch = useDispatch();
  function handleClick(menu) {
    dispatch(uiAction.changeMenu(menu));
  }
  return (
    <>
      <ul className="flex gap-8 mb-8">
        <TabButton
          layoutId="tabMenu"
          menu="tasks"
          onClick={() => handleClick("tasks")}
        >
          Your tasks
        </TabButton>
        <TabButton
          layoutId="tabMenu"
          menu="completedTask"
          onClick={() => handleClick("completedTasks")}
        >
          Completed tasks
        </TabButton>
        <TabButton
          layoutId="tabMenu"
          menu="failedTask"
          onClick={() => handleClick("failedTasks")}
        >
          Failed tasks
        </TabButton>
      </ul>
    </>
  );
}
