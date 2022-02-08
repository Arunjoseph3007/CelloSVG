import styles from "../styles/Home.module.css";
import { CirclePicker } from "react-color";
import { useState } from "react/cjs/react.development";

function ControllPanel({
  primClr,
  setPrimClr,
  secClr,
  setSecClr,
  controllerId,
  children,
}) {
  const [p, setP] = useState(false);
  const [s, setS] = useState(false);
  return (
    <div className={styles.controller}>
      <h1 className={styles.title}>Controlls</h1>
      <h3 style={{ marginRight: "auto", marginLeft: "1rem" }}>COLORS</h3>
      {/* <h5>BACKGROUND</h5> */}
      <div className={styles.colorcontainer}>
        <span
          onClick={() => setP(!p)}
          style={{
            backgroundColor: primClr,
          }}
        ></span>
        <h4>{primClr}</h4>
      </div>
      {p && (
        <CirclePicker
          color={primClr}
          onChangeComplete={(c, e) => setPrimClr(c.hex)}
        />
      )}
      {/* <h5>FOREGROUND</h5> */}
      <div className={styles.colorcontainer}>
        <span
          onClick={() => setS(!s)}
          style={{
            backgroundColor: secClr,
          }}
        ></span>
        <h4>{secClr}</h4>
      </div>
      {s && (
        <CirclePicker
          color={secClr}
          onChangeComplete={(c, e) => setSecClr(c.hex)}
        />
      )}
      {children}
    </div>
  );
}

export default ControllPanel;
