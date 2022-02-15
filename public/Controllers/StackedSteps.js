import { useEffect, useState, useRef } from "react";
import MainPanel from "../MainPanel";
import ControllPanel from "../ControllPanel";
import { InputSlider } from "../UsefullComponents";
import { randInt as r, mixColors as m } from "../Utilities";

function StackedSteps() {
  const svg = useRef();
  const [primClr, setPrimClr] = useState("#fa7268");
  const [secClr, setSecClr] = useState("#b0235f");
  const [count, setCount] = useState(5);
  const [complexity, setComplexity] = useState(10);
  const [contrast, setContrast] = useState(25);
  const [paths, setPaths] = useState([
    "M0 163L82 163L82 163L164 163L164 223L245 223L245 235L327 235L327 217L409 217L409 199L491 199L491 175L573 175L573 193L655 193L655 223L736 223L736 187L818 187L818 205L900 205L900 211L900 0L900 0L818 0L818 0L736 0L736 0L655 0L655 0L573 0L573 0L491 0L491 0L409 0L409 0L327 0L327 0L245 0L245 0L164 0L164 0L82 0L82 0L0 0Z",
    "M0 271L82 271L82 295L164 295L164 349L245 349L245 355L327 355L327 337L409 337L409 337L491 337L491 301L573 301L573 313L655 313L655 337L736 337L736 283L818 283L818 319L900 319L900 337L900 209L900 203L818 203L818 185L736 185L736 221L655 221L655 191L573 191L573 173L491 173L491 197L409 197L409 215L327 215L327 233L245 233L245 221L164 221L164 161L82 161L82 161L0 161Z",
    "M0 373L82 373L82 385L164 385L164 433L245 433L245 439L327 439L327 451L409 451L409 427L491 427L491 391L573 391L573 415L655 415L655 421L736 421L736 379L818 379L818 397L900 397L900 445L900 335L900 317L818 317L818 281L736 281L736 335L655 335L655 311L573 311L573 299L491 299L491 335L409 335L409 335L327 335L327 353L245 353L245 347L164 347L164 293L82 293L82 269L0 269Z",
    "M0 601L82 601L82 601L164 601L164 601L245 601L245 601L327 601L327 601L409 601L409 601L491 601L491 601L573 601L573 601L655 601L655 601L736 601L736 601L818 601L818 601L900 601L900 601L900 443L900 395L818 395L818 377L736 377L736 419L655 419L655 413L573 413L573 389L491 389L491 425L409 425L409 449L327 449L327 437L245 437L245 431L164 431L164 383L82 383L82 371L0 371Z",
  ]);

  const reset = () => {
    const newPaths = [];
    const startingPos = 250 / count;
    const endingPos = 470 - 250 / count;
    const increment = (endingPos - startingPos) / count;
    const s = 700 / complexity;
    for (let j = 0; j <= count; j++) {
      let posY = startingPos;
      let newPath = `M 700 500 L 0 500 L 0 ${startingPos} `;
      for (let posX = 0; posX <= 700; posX += s) {
        posY = r(posY - contrast, posY + contrast);
        newPath += ` H ${posX} V ${posY} `;
      }
      newPath += ` L 700 ${startingPos} Z`;
      newPaths.push(newPath);
      startingPos += increment;
    }
    setPaths(newPaths);
  };

  useEffect(() => reset, [count, complexity, contrast]);

  return (
    <>
      <MainPanel handleClick={reset}>
        <div ref={svg}>
          <svg id="visual" viewBox="0 0 700 500" width={700} height={500}>
            <rect x="0" y="0" width={700} height={500} fill={secClr}></rect>
            {paths.map((p) => (
              <path
                key={paths.indexOf(p)}
                d={p}
                fill={m(primClr, secClr, paths.indexOf(p) / paths.length)}
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
        <InputSlider title="COUNT" min={2} max={15} value={count} setValue={setCount} />
        <InputSlider title="COMPLEXITY" min={3} max={15} value={complexity} setValue={setComplexity} />
        <InputSlider title="CONTRAST" min={0} max={35} step={5} value={contrast} setValue={setContrast} />
      </ControllPanel>
    </>
  );
}

export default StackedSteps;
