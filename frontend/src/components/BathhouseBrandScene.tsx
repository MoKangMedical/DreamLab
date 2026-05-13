const WINDOWS = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  wide: index % 5 === 1,
  dim: index % 4 === 0,
}));

const LANTERNS = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  delay: `${index * 0.28}s`,
}));

export default function BathhouseBrandScene() {
  return (
    <div className="bathhouse-scene" aria-label="DreamLab 梦境油屋视觉场景">
      <div className="bathhouse-skyline" aria-hidden="true" />
      <div className="bathhouse-brand-sign">
        <span className="bathhouse-brand-sign-main">DreamLab</span>
        <span className="bathhouse-brand-sign-sub">心理研究院</span>
      </div>

      <div className="bathhouse-building bathhouse-building-back">
        <div className="bathhouse-roof roof-back" />
        <div className="bathhouse-window-grid">
          {WINDOWS.slice(0, 10).map((window) => (
            <span
              key={window.id}
              className={`bathhouse-window ${window.wide ? 'is-wide' : ''} ${window.dim ? 'is-dim' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="bathhouse-building bathhouse-building-front">
        <div className="bathhouse-roof roof-front" />
        <div className="bathhouse-window-grid is-front">
          {WINDOWS.map((window) => (
            <span
              key={window.id}
              className={`bathhouse-window ${window.wide ? 'is-wide' : ''} ${window.dim ? 'is-dim' : ''}`}
            />
          ))}
        </div>
        <div className="bathhouse-door">
          <span>心</span>
        </div>
      </div>

      <div className="bathhouse-bridge">
        {LANTERNS.map((lantern) => (
          <span key={lantern.id} className="bathhouse-lantern" style={{ animationDelay: lantern.delay }} />
        ))}
      </div>

      <div className="bathhouse-water">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
