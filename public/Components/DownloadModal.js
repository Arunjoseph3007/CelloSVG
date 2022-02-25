import styles from "../../styles/Home.module.css";
import { useState, useLayoutEffect } from "react";

const Modal = ({ modal, setModal, elm }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(elm.current.innerHTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 20000);
  };

  let url,blob;
  useLayoutEffect(() => {
    blob = new Blob([elm.current.innerHTML]);
    url = URL.createObjectURL(blob);
  }, []);

  if (!modal) return null;
  return (
    <div onClick={() => setModal(false)} className={styles.modal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalbox}>
        <button
          className={styles.close}
          onClick={() => setModal(false)}
        ></button>
        <textarea
          rows={16}
          type="text"
          readOnly
          value={elm.current.innerHTML}
        />
        <div className={styles.btncontainer}>
          <button onClick={handleCopy} className={styles.downloadbutton}>
            {copied ? "COPIED" : "COPY"}
          </button>
          <a
            download="cello-svg.svg"
            className={styles.downloadbutton}
            href={url}
          >
            DOWNLOAD SVG
          </a>
          <a
            download="cello-svg.svg"
            className={styles.downloadbutton}
            href={url}
          >
            DOWNLOAD PNG
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
