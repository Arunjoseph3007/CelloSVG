import styles from "../../styles/Home.module.css";
import { useState, useRef, useEffect } from "react";

function htmlToElem(html) {
  let temp = document.createElement('template');
  html = html.trim();
  temp.innerHTML = html;
  return temp.content.firstChild;
}

const Modal = ({ modal, setModal, elm}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(elm.current.innerHTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 20000);
  };

  // console.log("hey",canvasRef.current)

  const getURL = (svgRef) => {
    const blob1 = new Blob([svgRef.current.innerHTML]);
    const url = URL.createObjectURL(blob1);
    return url;
  };

  // let canvas
  // useEffect(()=>{
  //   canvas=document.querySelector('#canva')
  //   console.log(canvas)
  // })


  // const svgToPng = (svgRef) => {
  //     const template = htmlToElem(svgRef.current.innerHTML)
  //     const data = new XMLSerializer().serializeToString(template);
  //     const win = window.URL || window.webkitURL || window;
      
  //     const img=new Image();
  //     const blob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
  //     const url = win.createObjectURL(blob);

  //     // const canvas = canvasRef.current;
  //     // const canvas = document.createElement('canvas');
  //     var ctx = canvas.getContext('2d');
    
  //     img.onload = function () {
  //       ctx.drawImage(img, 0, 0);
  //       win.revokeObjectURL(url);
    
  //       const imgURI = canvas
  //           .toDataURL('image/png')
  //           .replace('image/png', 'image/octet-stream');

  //     return imgURI;
  //   }
  // };

  if (!modal) return null;
  return (
    <div onClick={() => setModal(false)} className={styles.modal}>
      <canvas id="canva" ></canvas>
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
          {/* <a
            download="cello-svg.png"
            className={styles.downloadbutton}
            href={svgToPng(elm)}
          >
            DOWNLOAD PNG
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
