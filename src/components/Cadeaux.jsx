import { useEffect, useState } from "react";
import { CADEAUX } from "../data.js";
import SectionHead from "./SectionHead.jsx";
import GiftModal from "./GiftModal.jsx";
import { delai } from "../useReveal.js";

const STORE = "cadeaux20-ouverts";
const TOTAL = CADEAUX.length;

function loadOpened() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORE) || "[]"));
  } catch {
    return new Set();
  }
}

export default function Cadeaux({ onBurst }) {
  const [opened, setOpened] = useState(loadOpened);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify([...opened]));
    } catch {}
  }, [opened]);

  const openGift = (i, el) => {
    const first = !opened.has(i);
    const next = new Set(opened).add(i);
    setOpened(next);
    setCurrent(i);
    if (first && el) {
      const r = el.getBoundingClientRect();
      onBurst(r.left + r.width / 2, r.top + r.height / 2, next.size === TOTAL ? 260 : 90);
    }
  };

  const close = () => {
    const i = current;
    setCurrent(null);
    requestAnimationFrame(() => document.getElementById(`gift-${i + 1}`)?.focus());
  };

  return (
    <>
      <section className="block" id="cadeaux" aria-labelledby="cadeauxTitle" style={{ paddingBottom: 0 }}>
        <SectionHead eyebrow="La surprise" title={`20 ans, ${TOTAL} cadeaux`} id="cadeauxTitle">
          Un cadeau pour chacune de tes années. Clique sur un paquet pour l'ouvrir et découvrir pourquoi je l'ai choisi.
        </SectionHead>
      </section>

      <div className="bar" data-reveal>
        <div className="count">
          <b>{opened.size}</b> / {TOTAL} ouverts
        </div>
        <div className="track" aria-hidden="true">
          <i style={{ width: `${(opened.size / TOTAL) * 100}%` }} />
        </div>
        <button className="reset" type="button" onClick={() => setOpened(new Set())}>
          Tout refermer
        </button>
      </div>

      <main className="grid" aria-label="Les cadeaux">
        {CADEAUX.map((g, i) => {
          const isOpen = opened.has(i);
          return (
            <button
              key={i}
              id={`gift-${i + 1}`}
              type="button"
              className={`gift p${i % 4}${isOpen ? " is-open" : ""}`}
              data-reveal="pop"
              style={delai(i % 5, 70)}
              aria-label={isOpen ? `Relire le cadeau ${i + 1} : ${g.nom}` : `Ouvrir le cadeau numéro ${i + 1}`}
              onClick={(e) => openGift(i, e.currentTarget)}
            >
              <span className="wrapper" />
              <span className="bow" />
              <span className="tag">{i + 1}</span>
              <span className="opened">
                <span className="n">Cadeau {i + 1}</span>
                <span className="name">{g.nom}</span>
                <span className="again">relire</span>
              </span>
            </button>
          );
        })}
      </main>

      {current !== null && (
        <GiftModal
          index={current}
          total={TOTAL}
          gift={CADEAUX[current]}
          onClose={close}
          onGo={(i) => openGift(i, document.querySelector(".card"))}
        />
      )}
    </>
  );
}
