import { useState, useEffect } from "react";
import MainPanel from "../MainPanel";
import ControllPanel from "../ControllPanel";
import styles from "../../styles/Home.module.css";
import { randInt, randNum } from "../Utilities";

function Circle() {
  const [primClr, setPrimClr] = useState("#30005f");
  const [secClr, setSecClr] = useState("#cc139e");
  const [fill, setFill] = useState(true);
  const [size, setSize] = useState(350);
  const [count, setCount] = useState(10);
  const [contrast, setContrast] = useState(0.05);
  const [circles, setCircles] = useState([
    { x: 100, y: 50, r: 40 },
    { x: 300, y: 250, r: 20 },
    { x: 600, y: 0, r: 70 },
    { x: 500, y: 200, r: 50 },
  ]);

  const reset = () => {
    let i = 0;
    const newCircles = [];
    const sq = (0.025 * size * size) / count;
    console.log(sq, (sq / 700) * (sq / 500));
    for (let y = 0; y < 500; y += sq) {
      for (let x = 0; x < 700; x += sq) {
        i++;
        newCircles.push({
          x: randNum(x, x + sq / 2),
          y: randNum(y, y + sq / 2),
          r: randNum((sq / 3) * 1, sq / 3),
        });
      }
    }
    setCircles(newCircles);
    console.log(i);
  };

  useEffect(() => reset(), [contrast, count, size]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <svg viewBox="0 0 700 500" width={700} height={500}>
          <rect x="0" y="0" width={700} height={500} fill={primClr}></rect>
          {circles.map((c) => (
            <circle
              cx={c.x}
              cy={c.y}
              r={c.r}
              stroke={secClr}
              strokeWidth="6"
              fill={fill ? secClr : "transparent"}
            />
          ))}
        </svg>
      </MainPanel>
      <ControllPanel
        primClr={primClr}
        setPrimClr={setPrimClr}
        secClr={secClr}
        setSecClr={setSecClr}
      >
        <div className={styles.slidercontainer}>
          <h5>FILL</h5>
          <div className={styles.radiocontainer}>
            <div
              style={{
                borderColor: fill ? "rgb(172, 238, 255)" : "white",
              }}
              onClick={() => setFill(true)}
              className={styles.radio}
            >
              <div
                style={{ background: "white" }}
                className={styles.radio1}
              ></div>
              <p>SOLID</p>
            </div>
            <div
              style={{
                borderColor: !fill ? "rgb(172, 238, 255)" : "white",
              }}
              onClick={() => setFill(false)}
              className={styles.radio}
            >
              <div className={styles.radio2}></div>
              <p>OUTLINE</p>
            </div>
          </div>
        </div>
        <div className={styles.slidercontainer}>
          <h5>SIZE</h5>
          <input
            className={styles.slider}
            type="range"
            min={200}
            max={600}
            step={10}
            value={size}
            onChange={(v) => setSize(v.target.value)}
          />
        </div>
        <div className={styles.slidercontainer}>
          <h5>COUNT</h5>
          <input
            className={styles.slider}
            type="range"
            min={5}
            max={15}
            step={1}
            value={count}
            onChange={(v) => setCount(v.target.value)}
          />
        </div>
        <div className={styles.slidercontainer}>
          <h5>CONTRAST</h5>
          <input
            className={styles.slider}
            type="range"
            min={0}
            max={0.1}
            step={0.01}
            value={contrast}
            onChange={(v) => setContrast(v.target.value)}
          />
        </div>
      </ControllPanel>
    </>
  );
}

export default Circle;
