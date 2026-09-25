import { VOEUX } from "../data.js";
import SectionHead from "./SectionHead.jsx";
import { delai } from "../useReveal.js";

export default function Voeux() {
  return (
    <section className="block" aria-labelledby="voeuxTitle">
      <SectionHead eyebrow="Mes vœux" title="Ce que je te souhaite pour tes 20 ans" id="voeuxTitle" />
      <ul className="voeux">
        {VOEUX.map((v, i) => (
          <li key={i} data-reveal="left" style={delai(i, 110)}>
            <div>
              <strong>{v.titre}</strong>
              <span>{v.texte}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
