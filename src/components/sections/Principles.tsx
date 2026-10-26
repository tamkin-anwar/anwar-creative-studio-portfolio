import { principles } from '../../content/company'

export function Principles() {
  return (
    <section className="sec" id="principles" aria-labelledby="principles-title">
      <p className="kicker">What we hold to</p>
      <h2 className="h2" id="principles-title">Four promises you can check.</h2>
      <div className="principles">
        {principles.map((p) => (
          <div key={p.statement}>
            <h3>{p.statement}</h3>
            <p>{p.support}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
