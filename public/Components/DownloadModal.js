import styles from "../../styles/Home.module.css";
import { useState, useRef, useEffect } from "react";

const Modal = ({ modal, setModal, elm }) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const [uri, setURI] = useState();

  const handleCopy = () => {
    navigator.clipboard.writeText(elm.current.innerHTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 20000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const svg = htmlToElem(elm.current.innerHTML);
    const data = new XMLSerializer().serializeToString(svg);

    const win = window.URL || window.webkitURL || window;
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = win.createObjectURL(blob);

    const img = new Image();
    img.src = url;

    img.onload = function () {
      canvas.getContext("2d").drawImage(img, 0, 0);
      win.revokeObjectURL(url);
      const imguri = canvas
        .toDataURL("image/png")
        .replace("image/png", "octet/stream");
      setURI(imguri);
    };
  }, []);

  return (
    <div onClick={() => setModal(false)} className={styles.modal}>
      <canvas
        width={700}
        height={500}
        style={{ position: "absolute", opacity: 0 }}
        ref={canvasRef}
      />
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
            href={getURL(elm)}
          >
            DOWNLOAD SVG
          </a>
          <a
            download="cello-svg.png"
            className={styles.downloadbutton}
            href={uri}
          >
            DOWNLOAD PNG
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;

function htmlToElem(html) {
  let temp = document.createElement("template");
  html = html.trim();
  temp.innerHTML = html;
  return temp.content.firstChild;
}

const getURL = (svgRef) =>
  URL.createObjectURL(new Blob([svgRef.current.innerHTML]));
