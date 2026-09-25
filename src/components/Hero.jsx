import { PRENOM } from "../data.js";
import { delai } from "../useReveal.js";

export default function Hero() {
  return (
    <header className="hero">
      <div className="eyebrow" data-reveal style={delai(0, 150)}>Pour tes 20 ans</div>
      <h1 data-reveal style={delai(1, 150)}>
        Joyeux anniversaire, <em>{PRENOM}</em>
      </h1>
      <div className="big20" aria-hidden="true" data-reveal="zoom" style={delai(2, 150)}>20</div>
      <p className="lead" data-reveal style={delai(4, 150)}>Aujourd'hui, c'est ton jour. Et j'ai préparé quelques surprises.</p>
      <a className="scroll-cue" href="#mot" data-reveal style={delai(5, 150)}>
        Descends doucement <span aria-hidden="true">↓</span>
      </a>
    </header>
  );
}
