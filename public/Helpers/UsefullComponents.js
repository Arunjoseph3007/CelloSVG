import { useState,useRef } from "react";
import styles from "../../styles/Home.module.css";
import { BlockPicker } from "react-color";
import { useOnClickOutside } from "./CustomHooks";

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
          {"<"}
        </div>
        <input
          style={{ "--x": ((value - min) / (max - min)) * 100 + "%" }}
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
          {">"}
        </div>
      </div>
    </div>
  );
};

export const ColorPicker = ({ id = 1, special = false, color, setColor ,remove}) => {
  const [isActive, setIsActive] = useState(false);
  const picker=useRef();

  const handleChange = (c, e) =>
    special ? setColor(id, c.hex) : setColor(c.hex);

  useOnClickOutside(picker,()=>{setIsActive(false);console.log("it");})

  return (
    <div className={styles.colorcontainer}>
      <span
        onClick={(e) => setIsActive(!isActive)}
        style={{
          backgroundColor: color,
        }}
      ></span>
      <h4>{color}</h4>
      {special && <span onClick={()=>remove(id)} ></span> }
      {isActive && (
        <div ref={picker} className={styles.block}>
          <BlockPicker
            
            width="200px"
            color={color}
            onChangeComplete={(c, e) => handleChange(c, e)}
          />
        </div>
      )}
    </div>
  );
};
