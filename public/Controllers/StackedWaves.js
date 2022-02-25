//components
import MainPanel from "../Components/MainPanel";
import ControllPanel from "../Components/ControllPanel";
//react
import { useEffect, useState, useRef } from "react";
//UI modules
import { InputSlider, ColorPicker } from "../Helpers/UsefullComponents";
//functions
import { getWave, mixColors as m } from "../Helpers/Utilities";

function StackedWave() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#110131");
  const [secClr, setSecClr] = useState("#bb00ff");
  const [terClr, setTerClr] = useState("#00ffff");
  const [complexity, setComplexity] = useState(10);
  const [contrast, setContrast] = useState(10);
  const [count, setCount] = useState(6);
  const [balance, setBalance] = useState(40);
  const [waves, setWaves] = useState([
    "M0 422L9.3 420.7C18.7 419.3 37.3 416.7 56.2 419.8C75 423 94 432 112.8 434.5C131.7 437 150.3 433 169 425.7C187.7 418.3 206.3 407.7 225 409.8C243.7 412 262.3 427 281.2 420.5C300 414 319 386 337.8 381.5C356.7 377 375.3 396 394 413.3C412.7 430.7 431.3 446.3 450 448.2C468.7 450 487.3 438 506.2 433.2C525 428.3 544 430.7 562.8 440C581.7 449.3 600.3 465.7 619 467.2C637.7 468.7 656.3 455.3 675 442.5C693.7 429.7 712.3 417.3 731.2 422.2C750 427 769 449 787.8 457.3C806.7 465.7 825.3 460.3 844 442.7C862.7 425 881.3 395 890.7 380L900 365L900 601L890.7 601C881.3 601 862.7 601 844 601C825.3 601 806.7 601 787.8 601C769 601 750 601 731.2 601C712.3 601 693.7 601 675 601C656.3 601 637.7 601 619 601C600.3 601 581.7 601 562.8 601C544 601 525 601 506.2 601C487.3 601 468.7 601 450 601C431.3 601 412.7 601 394 601C375.3 601 356.7 601 337.8 601C319 601 300 601 281.2 601C262.3 601 243.7 601 225 601C206.3 601 187.7 601 169 601C150.3 601 131.7 601 112.8 601C94 601 75 601 56.2 601C37.3 601 18.7 601 9.3 601L0 601Z",
  ]);

  const reset = () => {
    const newWaves = [];
    for (let i = 0; i < count; i++)
      newWaves.push(getWave(complexity, contrast));
    setWaves(newWaves);
  };

  useEffect(reset, [complexity, contrast]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg id="visual" viewBox="0 0 700 500" width="700" height="500">
            <rect x="0" y="0" width="900" height="600" fill={primClr}></rect>
            {waves.map((wave, index) => (
              <path
                d={wave}
                fill={m(secClr, terClr, index / count)}
                transform={`translate(0 -${(count - index) * balance})`}
                strokeLinecap="round"
                strokeLinejoin="miter"
                key={waves.indexOf(wave)}
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
        <ColorPicker color={terClr} setColor={setTerClr} />
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
          title="COUNT"
          min={1}
          max={10}
          value={count}
          setValue={setCount}
        />
        <InputSlider
          title="BALANCE"
          min={10}
          max={60}
          value={balance}
          setValue={setBalance}
        />
      </ControllPanel>
    </>
  );
}

export default StackedWave;
