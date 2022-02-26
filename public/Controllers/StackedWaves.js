//components
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//react
import { useEffect, useState, useRef } from "react";
//UI components
import {
  RadioFill,
  InputSlider,
  ColorPicker,
} from "../Helpers/UsefullComponents";
//functions
import { mixColors, getArrayOfRandomPoints } from "../Helpers/Utilities";
//D3
import * as d3 from "d3";
//styles
import styles from "../../styles/Home.module.css";

function StackedWave() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#ffaa77");
  const [secClr, setSecClr] = useState("#bb00ff");
  const [terClr, setTerClr] = useState("#bbf");
  const [complexity, setComplexity] = useState(13);
  const [contrast, setContrast] = useState(30);
  const [count, setCount] = useState(1);
  const [shape, setShape] = useState("wave");
  const [offset, setOffset] = useState(-200);
  const [waves, setWaves] = useState([[[0,0],[100,100],[200,200],[450,12],[0,30]]]);

  const shapes = ["wave", "step", "line"];

  const line = d3.line();

  const getWaveFromPoints = (wave, shape) => {
    switch (shape) {
      case "step":
        return line.curve(d3.curveStep)(wave);
      case "wave":
        return line.curve(d3.curveCardinal)(wave);
      case "line":
        return line(wave);
      default:
        return line(wave);
    }
  };

  const reset = () => {
    const newWaves = [];
    for (let i = 0; i < count; i++) {
      newWaves.push(getArrayOfRandomPoints(complexity, contrast));
    }
    setWaves(newWaves);
    // console.log(waves);
  };

  useEffect(reset, [complexity, contrast,count]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg id="visual" viewBox="0 0 700 500" width="700" height="500">
            <rect width="700" height="500" fill={primClr}></rect>
            {waves.map((w,i)=>{
              console.log("this is",i,getWaveFromPoints(w,shape));
              <path key={i} fill={secClr} d={getWaveFromPoints(w,shape)}  />
            })}
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
        <ColorPicker color={terClr} setColor={setTerClr} />
        <div className={styles.select}>
          <h5>SHAPE</h5>
          <div className={styles.colorcontainer}>
            {shapes.map((s, i) => (
              <div
                style={{
                  textTransform: "uppercase",
                  textAlign: "center",
                  borderRadius: "5px",
                  padding: "1rem",
                  flex: 1,
                  background: shape === s ? "lightblue" : "",
                }}
                key={i}
                onClick={() => setShape(s)}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <InputSlider
          title="COMPLEXITY"
          min={3}
          max={25}
          value={complexity}
          setValue={setComplexity}
        />
        <InputSlider
          title="CONTRAST"
          min={0}
          max={100}
          step={5}
          value={contrast}
          setValue={setContrast}
        />
        <InputSlider
          title="COUNT"
          min={1}
          max={12}
          value={count}
          setValue={setCount}
        />
        <InputSlider
          title="BASE"
          min={-500}
          max={0}
          value={offset}
          setValue={setOffset}
        />
      </ControllPanel>
    </>
  );
}

export default StackedWave;
