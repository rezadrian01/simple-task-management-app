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
          menu="process"
          onClick={() => handleClick("process")}
        >
          <span className="relative pointer-events-none">Your tasks</span>
        </TabButton>
        <TabButton
          layoutId="tabMenu"
          menu="completedTasks"
          onClick={() => handleClick("completedTasks")}
        >
          <span className="relative pointer-events-none">Completed tasks</span>
        </TabButton>
        <TabButton
          layoutId="tabMenu"
          menu="incompletedTasks"
          onClick={() => handleClick("incompletedTasks")}
        >
          <span className="relative pointer-events-none">
            Incompleted tasks
          </span>
        </TabButton>
      </ul>
    </>
  );
}
