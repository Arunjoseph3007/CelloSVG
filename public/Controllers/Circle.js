//Wrappers
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//REact
import { useState, useEffect, useRef } from "react";
//UI Modules
import { RadioFill ,InputSlider} from "../Helpers/UsefullComponents";
//Functions
import { getPositionsAndRadius as getCircles } from "../Helpers/Utilities";

function Circle() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#30005f");
  const [secClr, setSecClr] = useState("#cc139e");
  const [fill, setFill] = useState(true);
  const [size, setSize] = useState(350);
  const [count, setCount] = useState(10);
  const [contrast, setContrast] = useState(0.3);
  const [circles, setCircles] = useState([
    { x: 100, y: 50, r: 40 },
    { x: 300, y: 250, r: 20 },
    { x: 600, y: 0, r: 70 },
    { x: 500, y: 200, r: 50 },
  ]);

  const reset = () => setCircles(getCircles(count, size, contrast));

  useEffect(reset, [contrast, count, size]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg viewBox="0 0 700 500" width={700} height={500}>
            <rect x="0" y="0" width={700} height={500} fill={primClr}></rect>
            {circles.map((c) => (
              <circle
                key={circles.indexOf(c)}
                cx={c.x}
                cy={c.y}
                r={c.r}
                stroke={secClr}
                strokeWidth="6"
                fill={fill ? secClr : "transparent"}
              />
            ))}
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
        <InputSlider title="SIZE" min={200} max={600} step={10} value={size} setValue={setSize} />
        <InputSlider title="COUNT" min={5} max={15} value={count} setValue={setCount} />
        <InputSlider title="CONTRAST" max={0.6} step={0.1} value={contrast} setValue={setContrast} />
      </ControllPanel>
    </>
  );
}

export default Circle;
