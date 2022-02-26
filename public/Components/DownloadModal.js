import styles from "../../styles/Home.module.css";
import { useState, useRef, useEffect } from "react";

const Modal = ({ modal, setModal, elm }) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(elm.current.innerHTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 20000);
  };

  const handlePng = () => {
    const canvas = canvasRef.current;
    const svg = htmlToElem(elm.current.innerHTML);
    const data = new XMLSerializer().serializeToString(svg);
    const win = window.URL || window.webkitURL || window;
    const img = new Image();
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = win.createObjectURL(blob);
    img.onload = function () {
      canvas.getContext("2d").drawImage(img, 0, 0);
      win.revokeObjectURL(url);
      const uri = canvas
        .toDataURL("image/png")
        .replace("image/png", "octet/stream");
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = uri;
      a.download ="cello-svg.png";
      a.click();
      window.URL.revokeObjectURL(uri);
      document.body.removeChild(a);
    };
    img.src = url;
  };

  let imgURI;

  return (
    <div onClick={() => setModal(false)} className={styles.modal}>
      <canvas width={700} height={500} style={{position:"absolute",opacity:0}} ref={canvasRef} />
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
            onClick={handlePng}
            download="cello-svg.png"
            className={styles.downloadbutton}
            href={imgURI}
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

const getURL = (svgRef) => {
  const blob1 = new Blob([svgRef.current.innerHTML]);
  const url = URL.createObjectURL(blob1);
  return url;
};