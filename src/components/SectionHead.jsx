export default function SectionHead({ eyebrow, title, id, children }) {
  return (
    <div className="sec-head" data-reveal>
      <div className="eyebrow">{eyebrow}</div>
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
