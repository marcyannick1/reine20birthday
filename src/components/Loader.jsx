import { useEffect, useState } from "react";
import { PRENOM, PHOTOS } from "../data.js";

const DUREE = 3800; // durée du compteur 0 → 20, en millisecondes

function message(n) {
  if (n < 6) return "On emballe tes cadeaux…";
  if (n < 12) return "On allume les bougies…";
  if (n < 20) return "On choisit tes plus belles photos…";
  return `Tout est prêt, ${PRENOM}.`;
}

// Précharge les photos pour qu'elles soient déjà là à l'arrivée
function precharger() {
  const promesses = PHOTOS.filter((p) => p.src).map(
    (p) =>
      new Promise((ok) => {
        const img = new Image();
        img.onload = img.onerror = ok;
        img.src = p.src;
      })
  );
  const delaiMax = new Promise((ok) => setTimeout(ok, 5000));
  return Promise.race([Promise.all(promesses), delaiMax]);
}

export default function Loader({ onDepart, onDone }) {
  const [n, setN] = useState(0);
  const [pret, setPret] = useState(false);
  const [depart, setDepart] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duree = reduit ? 600 : DUREE;
    let raf;
    const t0 = performance.now();
    const compteur = new Promise((ok) => {
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duree);
        const ease = 1 - Math.pow(1 - p, 3);
        setN(Math.round(ease * 20));
        if (p < 1) raf = requestAnimationFrame(tick);
        else ok();
      };
      raf = requestAnimationFrame(tick);
    });
    Promise.all([compteur, precharger()]).then(() => setPret(true));
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  const entrer = () => {
    setDepart(true);
    onDepart?.();
    setTimeout(() => {
      document.body.style.overflow = "";
      onDone();
    }, 700);
  };

  return (
    <div className={`loader${depart ? " leaving" : ""}`} role="status" aria-live="polite">
      <svg className="loader-heart" viewBox="0 0 32 29" aria-hidden="true">
        <path d="M16 28.5S1 19.6 1 9.3C1 4.6 4.6 1 9 1c3 0 5.6 1.7 7 4.2C17.4 2.7 20 1 23 1c4.4 0 8 3.6 8 8.3 0 10.3-15 19.2-15 19.2z" />
      </svg>
      <div className="loader-count">
        <span className="loader-n">{n}</span>
        <span className="loader-ans">ans</span>
      </div>
      <div className="loader-track" aria-hidden="true">
        <i style={{ width: `${(n / 20) * 100}%` }} />
      </div>
      <p className="loader-msg">{message(n)}</p>
      <button className={`btn primary loader-btn${pret ? " show" : ""}`} type="button" onClick={entrer} disabled={!pret} tabIndex={pret ? 0 : -1}>
        Découvrir ♥
      </button>
    </div>
  );
}
