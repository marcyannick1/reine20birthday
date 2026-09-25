import { useRef, useState } from "react";
import Hero from "./components/Hero.jsx";
import Mot from "./components/Mot.jsx";
import Photos from "./components/Photos.jsx";
import Voeux from "./components/Voeux.jsx";
import Cadeaux from "./components/Cadeaux.jsx";
import Lettre from "./components/Lettre.jsx";
import Confetti from "./components/Confetti.jsx";
import Loader from "./components/Loader.jsx";
import useReveal from "./useReveal.js";

function Divider() {
  return <div className="divider" aria-hidden="true" data-reveal="fade">♥ ♥ ♥</div>;
}

export default function App() {
  const confettiRef = useRef(null);
  const burst = (x, y, n) => confettiRef.current?.burst(x, y, n);
  const [charge, setCharge] = useState(false);
  const [entree, setEntree] = useState(false);
  useReveal(entree);

  return (
    <>
      {!charge && <Loader onDepart={() => setEntree(true)} onDone={() => setCharge(true)} />}
      <Confetti ref={confettiRef} />
      <div className="wrap">
        <Hero />
        <Mot />
        <Divider />
        <Photos />
        <Divider />
        <Voeux />
        <Divider />
        <Cadeaux onBurst={burst} />
        <Lettre />
        <footer data-reveal="fade">Fait avec amour, rien que pour toi.</footer>
      </div>
    </>
  );
}
