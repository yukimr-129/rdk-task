import { useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import styles from "./TaskItem.module.css";
import { fetchDeleteTaskAsync, selectTask, editTask } from "./taskSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <li className={styles.listItem}>
      <span
        className={styles.cursor}
        onClick={() => dispatch(selectTask(task))}
      >
        {task.title}
      </span>
      <div>
        <button
          className={styles.taskIcon}
          onClick={() => dispatch(fetchDeleteTaskAsync(task.id))}
        >
          <BsTrash />
        </button>

        <button
          className={styles.taskIcon}
          onClick={() => dispatch(editTask(task))}
        >
          <FaEdit />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
