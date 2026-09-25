import { LETTRE, SIGNATURE } from "../data.js";

export default function Lettre() {
  return (
    <section className="letter" aria-labelledby="letterTitle" data-reveal>
      <h2 id="letterTitle">Un dernier mot</h2>
      {LETTRE.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <p className="sign">{SIGNATURE}</p>
    </section>
  );
}
