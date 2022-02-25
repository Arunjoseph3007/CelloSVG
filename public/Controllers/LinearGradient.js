//Wrappers
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//UI Modules
import { InputSlider, ColorPicker } from "../Helpers/UsefullComponents";
//React
import { useState, useRef} from "react/cjs/react.development";
//functions
import { randClr, randInt } from "../Helpers/Utilities";
//Hooks
import { useArray } from "../Helpers/CustomHooks";
//styles
import styles from "../../styles/Home.module.css"

function LinearGradient() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#23d997");
  const [secClr, setSecClr] = useState("#345a67");
  const [rotateAngle, setRotateAngle] = useState(90);
  const [offsets, setOffsets] = useState([5, 95]);
  const [ colors, setColors, {push, update, remove} ] = useArray([]);

  const reset = () => setOffsets([randInt(0, 50), randInt(50, 100)]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg viewBox="0 0 700 500" width={700} height={500}>
            <defs>
              <linearGradient
                id="myGradient"
                gradientTransform={`rotate(${rotateAngle})`}
              >
                <stop
                  offset={(100 * 1) / (2 + colors.length) + "%"}
                  stopColor={primClr}
                />
                <stop
                  offset={(100 * 2) / (2 + colors.length) + "%"}
                  stopColor={secClr}
                />
                {colors.map((elm, i) => (
                  <stop
                    key={i}
                    offset={(100 * (i + 3)) / (2 + colors.length) + "%"}
                    stopColor={elm}
                  />
                ))}
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width={700}
              height={500}
              fill="url(#myGradient)"
            ></rect>
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
        {colors.map((elm, i) => (
          <ColorPicker key={i} id={i} special={true} color={elm} setColor={update} remove={remove} />
        ))}
        <button className={styles.addbtn} onClick={()=>push(randClr())} >+</button>
        <InputSlider
          title="ROTATION"
          max={180}
          value={rotateAngle}
          setValue={setRotateAngle}
        />
      </ControllPanel>
    </>
  );
}

export default LinearGradient;
