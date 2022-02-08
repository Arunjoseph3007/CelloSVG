import { AllControllers } from "./ControllerList";
import styles from "../styles/Home.module.css";

function Selector({ controllerId, setControllerId }) {
  return (
    <div className={styles.selector}>
      <h1 className={styles.title}>
        Cello<span>SVG</span>
      </h1>
      <div className={styles.list}>
        <ul>
          {AllControllers.map((ThisController) => (
            <li
              key={ThisController.id}
              className={`${styles.listitem} ${
                ThisController.id === controllerId ? styles.selecteditem : ""
              }`}
              onClick={() => setControllerId(ThisController.id)}
              style={{ background: `url(${ThisController.thumbnail})` }}
            >
              {ThisController.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Selector;
