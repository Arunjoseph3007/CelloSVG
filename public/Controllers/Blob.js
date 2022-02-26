//Wrappers
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//REact
import { useState, useEffect, useRef } from "react";
//UI Modules
import { RadioFill, InputSlider } from "../Helpers/UsefullComponents";
//Functions
import { getBlob } from "../Helpers/Utilities";

function Blob() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#30005f");
  const [secClr, setSecClr] = useState("#cc139e");
  const [fill, setFill] = useState(true);
  const [size, setSize] = useState(350);
  const [count, setCount] = useState(10);
  const [contrast, setContrast] = useState(0.3);
  const [circle, setCircle] = useState();

  const reset = () => setCircle(getBlob());

  useEffect(reset, [contrast, count, size]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg viewBox="0 0 700 500" width={700} height={500}>
            <rect x="0" y="0" width={700} height={500} fill={primClr}></rect>
            <path
              transform="translate(350 250)"
              d={"M 0 0 L 50 60 Z"}
              fill={fill ? secClr : "transparent"}
              stroke={secClr}
            />
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
        <RadioFill fill={fill} setFill={setFill} />
        <InputSlider
          title="SIZE"
          min={200}
          max={600}
          step={10}
          value={size}
          setValue={setSize}
        />
        <InputSlider
          title="COUNT"
          min={5}
          max={15}
          value={count}
          setValue={setCount}
        />
        <InputSlider
          title="CONTRAST"
          max={0.6}
          step={0.1}
          value={contrast}
          setValue={setContrast}
        />
      </ControllPanel>
    </>
  );
}

export default Blob;
