import styles from "../styles/Home.module.css";

function MainPanel({ handleClick, children }) {
  return (
    <div className={styles.panel}>
      {children}
      <button onClick={handleClick} className={styles.dice}></button>
    </div>
  );
}

export default MainPanel;
