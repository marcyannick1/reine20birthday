import { PHOTOS } from "../data.js";
import SectionHead from "./SectionHead.jsx";
import { delai } from "../useReveal.js";

const TILTS = ["-3deg", "2deg", "-1.5deg", "2.5deg", "-2deg", "1.5deg"];

export default function Photos() {
  return (
    <section className="block" aria-labelledby="photosTitle">
      <SectionHead eyebrow="Rien que toi" title="Toi, sous tous les angles" id="photosTitle">
        Mes photos préférées de toi. J'ai eu du mal à choisir.
      </SectionHead>
      <div className="photos">
        {PHOTOS.map((p, i) => (
          <figure className="polaroid" key={i} data-reveal="drop" style={{ "--tilt": TILTS[i % TILTS.length], ...delai(i % 3, 120) }}>
            <div className="img">
              {p.src ? (
                <img src={p.src} alt={p.legende} loading="lazy" />
              ) : (
                <div className="ph">Photo {i + 1}</div>
              )}
            </div>
            <figcaption>{p.legende}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
