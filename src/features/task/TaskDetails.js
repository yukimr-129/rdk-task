import { useSelector } from "react-redux";
import styles from "./TaskDetails.module.css";
import { selectSelectedTasks } from "./taskSlice";

const TaskDetails = () => {
  const taskDetail = useSelector(selectSelectedTasks);
  return (
    <div className={styles.details}>
      {taskDetail.title && (
        <>
          <h2>{taskDetail.title}</h2>
          <p>Created at</p>
          <h3>{taskDetail.created_at}</h3>
          <p>Updated at</p>
          <h3>{taskDetail.updated_at}</h3>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
