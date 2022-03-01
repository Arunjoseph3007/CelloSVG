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
  const [isRandom, setIsRandom] = useState(false);
  const [borderWidth, setBorderWidth] = useState(0);
  const [distortion, setDistortion] = useState(0.8);
  const [resolution, setResolution] = useState(10);
  const [points, setPoints] = useState([[]]);

  const getFill = (isRandom, i, j, row) =>
    isRandom
      ? mixColors(primClr, secClr, Math.random())
      : mixColors(primClr, secClr, getRatio(i, j, row));

  const getRatio = (i, j, row) =>
    (i * i + j * j) / (points.length * points.length + row.length * row.length);

  const getPath = (i, j, c) =>
    c === "a"
      ? ` ${points[i][j].y},${points[i][j].x} 
          ${points[i + 1][j].y},${points[i + 1][j].x} 
          ${points[i + 1][j + 1].y},${points[i + 1][j + 1].x}`
      : ` ${points[i][j].y},${points[i][j].x} 
          ${points[i][j + 1].y},${points[i][j + 1].x} 
          ${points[i + 1][j + 1].y},${points[i + 1][j + 1].x}`;

  const reset = () => setPoints(getPolyGridPoints(distortion, resolution));

  useEffect(reset, [distortion, resolution]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg viewBox="0 0 700 500" width={700} height={500}>
            <rect x="0" y="0" width={700} height={500} fill={primClr}></rect>
            {points
              .filter((row, i) => i != points.length - 1)
              .map((row, i) =>
                row
                  .filter((p, j) => j != row.length - 1)
                  .map((p, j) => (
                    <>
                      <polygon
                        key={i + "a" + j}
                        points={getPath(i, j, "a")}
                        fill={getFill(isRandom, i, j, row)}
                        stroke={borderClr}
                        strokeWidth={borderWidth}
                      />
                      <polygon
                        key={i + "b" + j}
                        points={getPath(i, j, "b")}
                        fill={getFill(isRandom, i, j, row)}
                        stroke={borderClr}
                        strokeWidth={borderWidth}
                      />
                    </>
                  ))
              )}
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
        <RadioFill title="RANDOMizer" optA="RANDOM" optB="GRADIENT" fill={isRandom} setFill={setIsRandom} />
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
