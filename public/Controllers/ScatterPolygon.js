//Wrappers
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//UI Modules
import { InputSlider,RadioFill } from "../Helpers/UsefullComponents";
//React
import { useState, useRef,useEffect} from "react";
//functions
import {
  randInt as r,
  getPositionsAndRadius as getPoly,
  getPolygonPath as getPath,
} from "../Helpers/Utilities";

function ScatterPolygon() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#0d0712");
  const [isRandom,setIsRandom]=useState(false);
  const [secClr, setSecClr] = useState("#e30e4e");
  const [fill, setFill] = useState(false);
  const [size, setSize] = useState(350);
  const [count, setCount] = useState(10);
  const [contrast, setContrast] = useState(0.3);
  const [sides, setSides] = useState(6);
  const [polygons, setPolygons] = useState([
    { x: 100, y: 50, r: 40 },
    { x: 300, y: 250, r: 20 },
    { x: 600, y: 0, r: 70 },
    { x: 500, y: 200, r: 50 },
  ]);

  const reset = () => setPolygons(getPoly(count, size, contrast));

  useEffect(reset, [contrast, count, size]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg viewBox="0 0 700 500" width={700} height={500}>
            <rect x="0" y="0" width={700} height={500} fill={primClr}></rect>
            {polygons.map((c) => (
              <path
                key={polygons.indexOf(c)}
                strokeLinejoin="round"
                d={getPath(isRandom ? r(3,10) : sides, c.r)}
                stroke={secClr}
                strokeWidth="6"
                transform={`translate(${c.x} ${c.y}) rotate(90)`}
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
        <InputSlider title="CONTRAST" min={0} max={0.6} step={0.1} value={contrast} setValue={setContrast} />
        <RadioFill title="RANDOMizer" optA="RANDOM" optB="MANUAL" fill={isRandom} setFill={setIsRandom} />
        <InputSlider title="SIDES" min={3} max={15} value={sides} setValue={setSides} />
      </ControllPanel>
    </>
  );
}

export default ScatterPolygon;
