import { AllControllers } from "../Helpers/ControllerList";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";

function Selector({ controllerId, setControllerId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 700) {
      setIsLarge(false);
    }
  }, []);

  return (
    <div className={styles.selector}>
      <h1 onClick={() => {!isLarge && setIsOpen(!isOpen)}} className={styles.title}>
        Cello<span>SVG</span>
      </h1>
      {(isLarge || isOpen) && (
        <div>
          <div className={styles.listofselectors}>
            {AllControllers.map((ThisController) => (
              <button
                key={ThisController.id}
                onClick={() => setControllerId(ThisController.id)}
                className={`${styles.listitem} ${
                  ThisController.id === controllerId ? styles.selecteditem : ""
                }`}
                style={{
                  color: ThisController.color || "black",
                  background: `url(${ThisController.thumbnail})`,
                }}
              >
                {ThisController.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Selector;
