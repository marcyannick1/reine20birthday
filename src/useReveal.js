import { useEffect } from "react";

// Fait apparaître les éléments [data-reveal] quand ils arrivent à l'écran.
// Le délai de chaque élément se règle avec la variable CSS --d.
// On marque avec l'attribut data-vu (et pas une classe) : React réécrit
// className à chaque rendu, ce qui effacerait la marque (ex. cadeau ouvert).
export default function useReveal(actif) {
  useEffect(() => {
    if (!actif) return;
    const elements = document.querySelectorAll("[data-reveal]:not([data-vu])");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-vu", "");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [actif]);
}

// Raccourci pour le délai en cascade : style={delai(i)}
export const delai = (i, pas = 90) => ({ "--d": `${i * pas}ms` });
