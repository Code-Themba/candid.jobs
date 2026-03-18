const Stats = () => {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-num">100%</div>
        <div className="stat-label">Of listing verified as actively hiring</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">14d</div>
        <div className="stat-label">
          Maximum response window per application
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-num">0</div>
        <div className="stat-label">
          Companies with 3+ flags still on platform
        </div>
      </div>
    </div>
  );
};

export default Stats;
