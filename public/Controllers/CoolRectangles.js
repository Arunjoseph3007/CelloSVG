//Wrappers
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//UI modules
import { InputSlider, RadioFill } from "../Helpers/UsefullComponents";
//React
import { useState, useRef, useEffect } from "react";
//functions
import { randInt, randClr } from "../Helpers/Utilities";

function CoolRectangles() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#140f00");
  const [secClr, setSecClr] = useState("#f47");
  const [rotateAngle, setRotateAngle] = useState(45);
  const [isRand, setIsRand] = useState(false);
  const [paddingX, setPaddingX] = useState(15);
  const [paddingY, setPaddingY] = useState(10);
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(150);
  const [rectangles, setRectangles] = useState([
    { x: 10, y: 10, l: 80 },
    { x: 30, y: 50, l: 80 },
    { x: 300, y: 400, l: 100 },
  ]);

  const reset = () => {
    const newRectangles = [];
    for (let x = -450; x < 450; x += +paddingX) {
      for (let y = -450; y < 450; y += +paddingY) {
        let newL = randInt(width, height);
        newRectangles.push({
          x: x,
          y: y,
          l: newL,
        });
        y += +newL;
      }
      x += +width;
    }
    setRectangles(newRectangles);
  };

  useEffect(reset, [paddingX, paddingY, width,height]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg viewBox="0 0 700 500" width={700} height={500}>
            <rect x="0" y="0" width={700} height={500} fill={primClr}></rect>
            <g transform={`translate(350,250) rotate(${rotateAngle})`}>
              {rectangles.map((r, i) => (
                <rect
                  key={i}
                  x={r.x}
                  y={r.y}
                  width={width}
                  height={r.l}
                  rx={width / 2}
                  ry={width / 2}
                  fill={isRand ? randClr() : secClr}
                ></rect>
              ))}
            </g>
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
        <RadioFill title="RANDOMizer" optA="RANDOM" optB="MANUAL" fill={isRand} setFill={setIsRand}/>
        <InputSlider title="ROTATION" max={180} value={rotateAngle} setValue={setRotateAngle}/>
        <InputSlider title="HEIGTH" min={100} max={300} step={5} value={height} setValue={setHeight}/>
        <InputSlider title="WIDTH" min={5} max={100} step={5} value={width} setValue={setWidth}/>
        <InputSlider title="SPACEX" max={60} step={5} value={paddingX} setValue={setPaddingX} />
        <InputSlider title="SPACEY" max={80} step={5} value={paddingY} setValue={setPaddingY} />
      </ControllPanel>
    </>
  );
}

export default CoolRectangles;
