//Wrappers
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//UI Modules
import {
  ColorPicker,
  InputSlider,
  RadioFill,
} from "../Helpers/UsefullComponents";
//React
import { useState, useRef, useEffect } from "react";
//functions
import { getPolyGridPoints, mixColors } from "../Helpers/Utilities";

const PolyGrid = () => {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#37d67a");
  const [secClr, setSecClr] = useState("#555555");
  const [borderClr, setBorderClr] = useState("#d9e3f0");
  const [borderWidth, setBorderWidth] = useState(0);
  const [distortion, setDistortion] = useState(0.5);
  const [resolution, setResolution] = useState(10);
  const [points, setPoints] = useState([[]]);

  const reset = () => setPoints(getPolyGridPoints(distortion, resolution));

  useEffect(reset, [distortion, resolution]);

  const getPolygons = (array) => {
    const yLength = array.length;
    const xLength = array[0].length;
    return array.map((row, i) => {
      if (i === yLength - 1) return null;
      return row.map((p, j) => {
        if (j === xLength - 1) return null;
        return (
          <>
            <polygon
              key={i + "a" + j}
              points={`
                    ${p.y},${p.x} 
                    ${points[i + 1][j].y},${points[i + 1][j].x} 
                    ${points[i + 1][j + 1].y},${points[i + 1][j + 1].x}`}
              fill={mixColors(primClr, secClr, Math.random())}
              stroke={borderClr}
              strokeWidth={borderWidth}
            />
            <polygon
              key={i + "b" + j}
              points={`
                  ${p.y},${p.x} 
                  ${points[i][j + 1].y},${points[i][j + 1].x} 
                  ${points[i + 1][j + 1].y},${points[i + 1][j + 1].x}`}
              fill={mixColors(primClr, secClr, Math.random())}
              stroke={borderClr}
              strokeWidth={borderWidth}
            />
          </>
        );
      });
    });
  };

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg viewBox="0 0 700 500" width={700} height={500}>
            <rect x="0" y="0" width={700} height={500} fill={primClr}></rect>
            {getPolygons(points)}
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
        <ColorPicker color={borderClr} setColor={setBorderClr} />
        <InputSlider
          title="DISTORTION"
          value={distortion}
          setValue={setDistortion}
          min={0}
          max={1}
          step={0.05}
        />
        <InputSlider
          title="RESOLUTION"
          value={resolution}
          setValue={setResolution}
          min={5}
          max={20}
        />
        <InputSlider
          title="BORDERWIDTH"
          value={borderWidth}
          setValue={setBorderWidth}
          max={10}
        />
      </ControllPanel>
    </>
  );
};

export default PolyGrid;
