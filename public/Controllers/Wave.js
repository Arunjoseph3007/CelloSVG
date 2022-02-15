import { useEffect, useState, useRef } from "react";
import MainPanel from "../MainPanel";
import ControllPanel from "../ControllPanel";
import { RadioFill, InputSlider } from "../UsefullComponents";
import { getWave, getRandomArray } from "../Utilities";

function Wave() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#ffaa77");
  const [secClr, setSecClr] = useState("#bb00ff");
  const [complexity, setComplexity] = useState(5);
  const [contrast, setContrast] = useState(25);
  const [fill, setFill] = useState(true);
  const [offset, setOffset] = useState(200);
  const [wave, setWave] = useState(getRandomArray(complexity, 5, 2.5));

  const reset = () => setWave(getWave(complexity,contrast))

  useEffect(reset, [complexity, contrast]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg
            id="visual"
            viewBox="0 0 700 500"
            width="700"
            height="500"
          >
            <rect x="0" y="0" width="900" height="600" fill={primClr}></rect>
            <path
              stroke={secClr}
              strokeWidth="20"
              d={wave}
              fill={fill ? secClr : "transparent"}
              strokeLinecap="round"
              strokeLinejoin="miter"
              transform={`translate(0 -${offset})`}
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
          title="COMPLEXITY"
          min={3}
          max={15}
          value={complexity}
          setValue={setComplexity}
        />
        <InputSlider
          title="CONTRAST"
          min={0}
          max={50}
          step={5}
          value={contrast}
          setValue={setContrast}
        />
        <InputSlider
          title="BASE"
          min={0}
          max={450}
          value={offset}
          setValue={setOffset}
        />
      </ControllPanel>
    </>
  );
}

export default Wave;
