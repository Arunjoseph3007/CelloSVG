//Wrappers
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//UI Modules
import { InputSlider } from "../Helpers/UsefullComponents";
//React
import { useState, useRef,useEffect} from "react";
//functions
import {getPositionsAndRadius as getRain} from '../Helpers/Utilities'

function Rain() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#dbd400");
  const [secClr, setSecClr] = useState("#000424");
  const [width, setWidth] = useState(2);
  const [rotateAngle, setRotateAngle] = useState(35);
  const [count, setCount] = useState(5);
  const [lenght, setLength] = useState(2);
  const [lines, setLines] = useState([
    { x: 100, y: 50, r: 40 },
    { x: 300, y: 250, r: 20 },
    { x: 600, y: 0, r: 70 },
    { x: 500, y: 200, r: 50 },
  ]);

  const reset = () => setLines(getRain(count));

  useEffect(reset, [count]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg viewBox="0 0 700 500" width={700} height={500}>
            <rect x="0" y="0" width={700} height={500} fill={primClr}></rect>
            {lines.map((c) => (
              <path
                key={lines.indexOf(c)}
                d={`M 0 0 L 0 ${c.r * lenght}`}
                stroke={secClr}
                strokeWidth={width}
                transform={`translate(${c.x} ${c.y}) rotate(${
                  -1 * rotateAngle
                })`}
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
        <InputSlider title="COUNT" min={3} max={20} value={count} setValue={setCount} />
        <InputSlider title="ROTATE" min={-90} max={90} value={rotateAngle} setValue={setRotateAngle} />
        <InputSlider title="LENGTH" min={1} max={3} step={0.1} value={lenght} setValue={setLength} />
        <InputSlider title="WIDTH" min={1} max={6} value={width} setValue={setWidth} />
      </ControllPanel>
    </>
  );
}

export default Rain;
