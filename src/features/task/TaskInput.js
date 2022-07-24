import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TaskInput.module.css";
import {
  fetchCreateTaskAsync,
  fetchUpdateTaskAsync,
  editTask,
  selectEditedTasks,
} from "./taskSlice";

const TaskInput = () => {
  const editedTask = useSelector(selectEditedTasks);
  const dispatch = useDispatch();

  const isdisabled = editedTask.title === "";

  const handleInputTask = (e) => {
    if (editedTask.id === 0) {
      //新規作成
      dispatch(editTask({ id: 0, title: e.target.value }));
    } else {
      //更新
      dispatch(editTask({ id: editedTask.id, title: e.target.value }));
    }
  };

  const onCreateTask = () => {
    dispatch(fetchCreateTaskAsync(editedTask));
    dispatch(editTask({ id: 0, title: "" }));
  };
  const onUpdateTask = () => {
    dispatch(fetchUpdateTaskAsync(editedTask));
    dispatch(editTask({ id: 0, title: "" }));
  };

  return (
    <>
      <div>
        <input
          type="text"
          className={styles.taskInput}
          value={editedTask.title}
          placeholder="Please input Task"
          onChange={handleInputTask}
        />
        <div className={styles.switch}>
          {editedTask.id === 0 ? (
            <Button
              variant="contained"
              disabled={isdisabled}
              onClick={onCreateTask}
              color="primary"
            >
              Create
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={isdisabled}
              onClick={onUpdateTask}
              color="primary"
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskInput;
