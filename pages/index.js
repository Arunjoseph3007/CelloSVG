import { useState, useRef } from "react";
//Components
import Selector from "../public/Selector";
//Controllers
import RadialGradient from "../public/Controllers/RadialGradient";
import Circle from "../public/Controllers/Circle";
import StackedSteps from "../public/Controllers/StackedSteps";
import LinearGradient from "../public/Controllers/LinearGradient";
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
      </main>
    </div>
  );
}
