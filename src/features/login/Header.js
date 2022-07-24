import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import { selectProfile } from "./loginSlice";

const Header = () => {
  const user = useSelector(selectProfile);
  return (
    <div className={styles.header}>
      <h3>{user.username}</h3>
      <h1>Today,s Task</h1>
    </div>
  );
};

export default Header;
