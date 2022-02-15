import styles from "../styles/Home.module.css";
import { useState } from "react";

const Modal = ({ modal, setModal, elm }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(elm.current.innerHTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 20000);
  };

  if (!modal) return null;
  return (
    <div onClick={() => setModal(false)} className={styles.modal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalbox}>
        <button className={styles.close} onClick={() => setModal(false)}>x</button>
        <textarea
          rows={16}
          type="text"
          readOnly
          value={elm.current.innerHTML}
        />
        <div>
          <button onClick={handleCopy} className={styles.downloadbutton}>
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
