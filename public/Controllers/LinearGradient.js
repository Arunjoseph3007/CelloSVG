import MainPanel from "../MainPanel";
import ControllPanel from "../ControllPanel";
import { InputSlider } from "../UsefullComponents";
import { useState, useRef } from "react/cjs/react.development";
import { randInt } from "../Utilities";
import styles from "../../styles/Home.module.css";

function LinearGradient() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#23d997");
  const [secClr, setSecClr] = useState("#345a67");
  const [rotateAngle, setRotateAngle] = useState(90);
  const [offsets, setOffsets] = useState([5, 95]);

  const reset = () => setOffsets([randInt(0, 50), randInt(50, 100)]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
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
        </div>
      </MainPanel>
      <ControllPanel
        elm={svg}
        primClr={primClr}
        setPrimClr={setPrimClr}
        secClr={secClr}
        setSecClr={setSecClr}
      >
        <InputSlider title="ROTATION" max={180} value={rotateAngle} setValue={setRotateAngle}/>
      </ControllPanel>
    </>
  );
}

export default LinearGradient;
