//Hooks
import { useState } from "react";
//Components
import Selector from "../public/Selector";
//Controllers
import LinearGradient from "../public/Controllers/LinearGradient";
import RadialGradient from "../public/Controllers/RadialGradient";
import Circle from "../public/Controllers/Circle";
import StackedSteps from "../public/Controllers/StackedSteps";
import ScatterPolygon from "../public/Controllers/ScatterPolygon";
import Rain from "../public/Controllers/Rain";
import Wave from "../public/Controllers/Wave";
import StackedWave from "../public/Controllers/StackedWaves";
//Styles
import styles from "../styles/Home.module.css";
//Utils
import Head from "next/head";

export default function Home() {
  const [controllerId, setControllerId] = useState(0);
  
  return (
    <div>
      <Head>
        <title>Cello SVG</title>
        <meta name="description" content="A free SVG generator" />
      </Head>
      <main className={styles.main}>
        <Selector
          controllerId={controllerId}
          setControllerId={setControllerId}
        />
        {controllerId === 0 && <LinearGradient />}
        {controllerId === 1 && <RadialGradient />}
        {controllerId === 2 && <Circle />}
        {controllerId === 3 && <StackedSteps />}
        {controllerId === 4 && <ScatterPolygon />}
        {controllerId === 5 && <Rain />}
        {controllerId === 6 && <Wave />}
        {controllerId === 7 && <StackedWave />}
      </main>
    </div>
  );
}
