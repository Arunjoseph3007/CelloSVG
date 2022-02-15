import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { ChromePicker, BlockPicker } from "react-color";

export const RadioFill = ({
  title = "FILL",
  optA = "SOLID",
  optB = "OUTLINE",
  fill,
  setFill,
}) => {
  return (
    <div className={styles.slidercontainer}>
      <h5>{title}</h5>
      <div className={styles.radiocontainer}>
        <div
          style={{
            borderColor: fill ? "rgb(172, 238, 255)" : "white",
          }}
          onClick={() => setFill(true)}
          className={styles.radio}
        >
          <div style={{ background: "white" }} className={styles.radio1}></div>
          <p>{optA}</p>
        </div>
        <div
          style={{
            borderColor: !fill ? "rgb(172, 238, 255)" : "white",
          }}
          onClick={() => setFill(false)}
          className={styles.radio}
        >
          <div className={styles.radio2}></div>
          <p>{optB}</p>
        </div>
      </div>
    </div>
  );
};

export const InputSlider = ({
  title,
  min = 0,
  max,
  step = 1,
  value,
  setValue,
}) => {
  return (
    <div className={styles.slidercontainer}>
      <h5>{title}</h5>
      <div className={styles.inputcontrols}>
        <div
          onClick={() => setValue(value > min ? value - step : min)}
          className={styles.sliderbutton}
        >
          {'<'}
        </div>
        <input
          className={styles.slider}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(v) => setValue(v.target.value)}
        />
        <div
          onClick={() => setValue(value < max ? value + step : max)}
          className={styles.sliderbutton}
        >
          {'>'}
        </div>
      </div>
    </div>
  );
};

export const ColorPicker = ({ color, setColor }) => {
  const picker = useRef();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.colorcontainer}>
      <span
        onClick={(e) => setIsActive(!isActive)}
        style={{
          backgroundColor: color,
        }}
      ></span>
      <h4>{color}</h4>
      {isActive && (
        <div className={styles.block}>
          <BlockPicker
            ref={picker}
            width="200px"
            color={color}
            onChangeComplete={(c, e) => setColor(c.hex)}
          />
        </div>
      )}
    </div>
  );
};
