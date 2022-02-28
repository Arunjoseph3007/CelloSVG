//Hooks
import { useState } from "react";
//Components
import Selector from "../public/Components/Selector";
//Controllers
import LinearGradient from "../public/Controllers/LinearGradient";
import RadialGradient from "../public/Controllers/RadialGradient";
import Circle from "../public/Controllers/Circle";
import StackedSteps from "../public/Controllers/StackedSteps";
import ScatterPolygon from "../public/Controllers/ScatterPolygon";
import Rain from "../public/Controllers/Rain";
import StackedWave from "../public/Controllers/StackedWaves";
import SuperWave from "../public/Controllers/SuperWave";
import CoolRectangles from "../public/Controllers/CoolRectangles";
import Blob from '../public/Controllers/Blob'
import PolyGrid from "../public/Controllers/PolyGrid";
//Styles
import styles from "../styles/Home.module.css";
//Utils
import Head from "next/head";

export default function Home() {
  const [controllerId, setControllerId] = useState(9);
  
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
        {controllerId === 7 && <StackedWave />}
        {controllerId === 8 && <SuperWave />}
        {controllerId === 9 && <CoolRectangles />}
        {controllerId === 10 && <Blob />}
        {controllerId === 11 && <PolyGrid />}
      </main>
    </div>
  );
}
