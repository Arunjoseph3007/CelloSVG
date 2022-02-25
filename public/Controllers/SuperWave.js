//components
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//react
import { useEffect, useState, useRef } from "react";
//UI components
import { RadioFill, InputSlider } from "../Helpers/UsefullComponents";
//functions
import { getWave, getRandomArray } from "../Helpers/Utilities";
//D3
import * as d3 from "d3";

function SuperWave() {
  const svg = useRef();
  const svgRef = useRef();
  const [primClr, setPrimClr] = useState("#ffaa77");
  const [secClr, setSecClr] = useState("#bb00ff");
  const [complexity, setComplexity] = useState(5);
  const [contrast, setContrast] = useState(25);
  const [fill, setFill] = useState(true);
  const [offset, setOffset] = useState(200);
  const [wave, setWave] = useState(getRandomArray(complexity, 5, 2.5));

  const svgD = d3.select(svgRef.current);
  var w = 700; // width
  var h = 500; // height

  const data = [
    3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9,
    2, 5, 9, 2, 7,
  ];

  const x = d3.scaleLinear().domain([0, data.length]).range([0, w]);
  const y = d3.scaleLinear().domain([0, 10]).range([h, 0]);

  const line = d3
    .line()
    .x((d, i) => x(i))
    .y((d) => y(d));

  const graph = d3
    .select(svg.current)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    graph.append("path").attr("d", line(data)).attr("fill", secClr);
  const reset = () => {
    setWave(getWave(complexity, contrast));
  };

  useEffect(reset, [complexity, contrast]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          {/* <svg
            ref={svgRef}
            id="visual"
            viewBox="0 0 700 500"
            width="700"
            height="500"
          ></svg> */}
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

export default SuperWave;
