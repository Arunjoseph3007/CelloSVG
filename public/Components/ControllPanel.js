import styles from "../../styles/Home.module.css";
import { ColorPicker } from "../Helpers/UsefullComponents";
import { useState } from "react/cjs/react.development";
import Modal from "./DownloadModal";

function ControllPanel({
  primClr,
  setPrimClr,
  secClr,
  setSecClr,
  controllerId,
  elm,
  children,
}) {
  const [modal, setModal] = useState(false);

  return (
    <div className={styles.controller}>
      <div className={styles.controllpanel}>
        <h1 className={styles.title}>Controlls</h1>
        <h3 style={{ marginRight: "auto", marginLeft: "1rem" }}>COLORS</h3>
        {/* <h5>BACKGROUND</h5> */}
        <ColorPicker color={primClr} setColor={setPrimClr} />
        {/* <h5>FOREGROUND</h5> */}
        <ColorPicker color={secClr} setColor={setSecClr} />
        {children}
      </div>
      <div className={styles.downloadpanel}>
        <button
          onClick={() => setModal(true)}
          className={styles.downloadbutton}
        >
          GET THIS SVG
        </button>
      </div>
      <Modal modal={modal} setModal={setModal} elm={elm} />
    </div>
  );
}

export default ControllPanel;
