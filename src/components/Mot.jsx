import { MOT } from "../data.js";
import SectionHead from "./SectionHead.jsx";
import { delai } from "../useReveal.js";

export default function Mot() {
  return (
    <section className="block" id="mot" aria-labelledby="motTitle">
      <SectionHead eyebrow="Pour toi" title="Vingt ans, déjà" id="motTitle" />
      <div className="mot">
        {MOT.map((p, i) => (
          <p key={i} data-reveal style={delai(i, 150)}>{p}</p>
        ))}
      </div>
    </section>
  );
}
