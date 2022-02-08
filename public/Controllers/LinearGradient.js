import MainPanel from "../MainPanel";
import ControllPanel from "../ControllPanel";
import { useState, useRef } from "react/cjs/react.development";
import { randInt } from "../Utilities";
import styles from "../../styles/Home.module.css";

function LinearGradient() {
  const [primClr, setPrimClr] = useState("#23d997");
  const [secClr, setSecClr] = useState("#345a67");
  const [rotateAngle, setRotateAngle] = useState(90);
  const [offsets, setOffsets] = useState([5, 95]);

  const reset = () => setOffsets([randInt(0, 50), randInt(50, 100)]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <svg viewBox="0 0 700 500" width={700} height={500}>
          <defs>
            <linearGradient
              id="myGradient"
              gradientTransform={`rotate(${rotateAngle})`}
            >
              <stop offset={offsets[0] + "%"} stopColor={primClr} />
              <stop offset={offsets[1] + "%"} stopColor={secClr} />
            </linearGradient>
          </defs>
          <rect
            x="0"
            y="0"
            width={700}
            height={500}
            fill="url(#myGradient)"
          ></rect>
        </svg>
      </MainPanel>
      <ControllPanel
        primClr={primClr}
        setPrimClr={setPrimClr}
        secClr={secClr}
        setSecClr={setSecClr}
      >
        <div className={styles.slidercontainer}>
          <h5>ROTATION</h5>
          <input
            className={styles.slider}
            type="range"
            min={0}
            max={180}
            step={1}
            value={rotateAngle}
            onChange={(v) => setRotateAngle(v.target.value)}
          />
        </div>
      </ControllPanel>
    </>
  );
}

export default LinearGradient;
