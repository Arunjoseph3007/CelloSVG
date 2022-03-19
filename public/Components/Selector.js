import { AllControllers } from "../Helpers/ControllerList";
import styles from "../../styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "../Helpers/CustomHooks";

function Selector({ controllerId, setControllerId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(true);
  const listPanel = useRef();

  useEffect(() => setIsLarge(window.innerWidth > 700), []);

  useOnClickOutside(listPanel, () => setIsOpen(false));

  return (
    <div className={styles.selector}>
      <h1
        onClick={() => {
          !isOpen && setIsOpen(!isOpen);
        }}
        className={styles.title}
      >
        Cello<span>SVG</span>
        <button
          style={{
            float: "right",
            border: "none",
            background: "tranparent",
            color: "white",
          }}
        >
          {" "}
          =
        </button>
      </h1>
      {(isLarge || isOpen) && (
        <div ref={listPanel}>
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
