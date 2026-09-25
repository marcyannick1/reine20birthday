import { useEffect, useRef } from "react";

export default function GiftModal({ index, total, gift, onClose, onGo }) {
  const nextRef = useRef(null);
  const last = index === total - 1;

  useEffect(() => {
    nextRef.current?.focus();
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && !last) onGo(index + 1);
      if (e.key === "ArrowLeft" && index > 0) onGo(index - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, last, onClose, onGo]);

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gName"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* key={index} relance l'animation d'apparition à chaque cadeau */}
      <div className="card" key={index}>
        <button className="close" type="button" aria-label="Fermer" onClick={onClose}>
          ×
        </button>
        <div className="kicker">
          Cadeau {index + 1} / {total}
        </div>
        <h3 id="gName">{gift.nom}</h3>
        <div className="why-label">Pourquoi je l'ai choisi</div>
        <p className="why">{gift.why}</p>
        <div className="nav">
          <button className="btn" type="button" disabled={index === 0} onClick={() => onGo(index - 1)}>
            ← Précédent
          </button>
          <button
            ref={nextRef}
            className="btn primary"
            type="button"
            onClick={() => (last ? onClose() : onGo(index + 1))}
          >
            {last ? "Fermer" : "Cadeau suivant →"}
          </button>
        </div>
      </div>
    </div>
  );
}
