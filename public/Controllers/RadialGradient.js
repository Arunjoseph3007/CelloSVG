import { useState } from "react";
import { randNum } from "../Utilities";
import MainPanel from "../MainPanel";
import ControllPanel from "../ControllPanel";
import styles from "../../styles/Home.module.css";

function RadialGradient() {
  const [primClr, setPrimClr] = useState("#297");
  const [secClr, setSecClr] = useState("#83e924");
  const [circles, setCircles] = useState({ cx: 0.25, cy: 0.25 });
  const [radius, setRadius] = useState(1.5);

  const reset = () => setCircles({ cx: randNum(0, 1), cy: randNum(0, 1) });

  return (
    <>
      <MainPanel handleClick={reset}>
        <svg viewBox="0 0 700 500" width={700} height={500}>
          <rect
            x="0"
            y="0"
            width={700}
            height={500}
            fill="url(#myGradient)"
          ></rect>
          <defs>
            <radialGradient
              id="myGradient"
              cx={circles.cx}
              cy={circles.cy}
              r={radius}
              spreadMethod="pad"
            >
              <stop offset="0%" stopColor={primClr} />
              <stop offset="95%" stopColor={secClr} />
            </radialGradient>
          </defs>
        </svg>
      </MainPanel>
      <ControllPanel
        primClr={primClr}
        setPrimClr={setPrimClr}
        secClr={secClr}
        setSecClr={setSecClr}
      >
        <div className={styles.slidercontainer}>
          <h5>RADIUS</h5>
          <input
            className={styles.slider}
            type="range"
            min={0}
            max={2.5}
            step={0.01}
            value={radius}
            onChange={(v) => setRadius(v.target.value)}
          />
        </div>
      </ControllPanel>
    </>
  );
}

export default RadialGradient;
