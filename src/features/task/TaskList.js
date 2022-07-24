import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllTaskAsync, selectIsLoding, selectTasks } from "./taskSlice";
import TaskItem from "./TaskItem";
import { fetchAuthUserProfile } from "../login/loginSlice";

import styles from "./TaskList.module.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loding = useSelector(selectIsLoding);

  useEffect(() => {
    const fetchInittasks = async () => {
      await dispatch(fetchGetAllTaskAsync());
      await dispatch(fetchAuthUserProfile());
    };

    fetchInittasks();
  }, [dispatch]);

  return (
    <>
      {loding ? (
        <div>loding....</div>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
