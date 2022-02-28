//Wrappers
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//REact
import { useState, useEffect, useRef } from "react";
//UI Modules
import { RadioFill, InputSlider } from "../Helpers/UsefullComponents";
//Functions
import { getBlob } from "../Helpers/Utilities";
import { getSmoothPath } from "../Helpers/D3Helpers";

function Blob() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#13022e");
  const [secClr, setSecClr] = useState("#f79000");
  const [fill, setFill] = useState(true);
  const [size, setSize] = useState(0.8);
  const [complexity, setComplexity] = useState(8);
  const [contrast, setContrast] = useState(0.3);
  const [blob, setBlob] = useState([]);

  const reset = () => setBlob(getBlob(complexity, contrast));

  useEffect(reset, [contrast, complexity]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg viewBox="0 0 700 500" width={700} height={500}>
            <rect x="0" y="0" width={700} height={500} fill={primClr}></rect>
            <path
              transform={`translate(350 250) scale(${size})`}
              d={getSmoothPath(blob)}
              fill={fill ? secClr : "transparent"}
              stroke={secClr}
              strokeWidth={20}
              strokeLinejoin="round"
              style={{transition:"all 1s cubic-bezier(0.55, -1.54, 0.49, 2.55) 0s"}}
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
          min={0.1}
          max={2}
          step={0.1}
          value={size}
          setValue={setSize}
        />
        <InputSlider
          title="COMPLEXITY"
          min={3}
          max={15}
          value={complexity}
          setValue={setComplexity}
        />
        <InputSlider
          title="CONTRAST"
          min={0}
          max={1}
          step={0.1}
          value={contrast}
          setValue={setContrast}
        />
      </ControllPanel>
    </>
  );
}

export default Blob;
