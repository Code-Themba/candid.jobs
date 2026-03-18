const Jobs = () => {
  return (
    <div className="jobs-section">
      <div className="section-header">
        <h2 className="section-title">Live verified listings</h2>
        <span styles="font-size:12px; color:var(--color-text-tertiary); font-family: 'DM Mono', monospace;">
          247 open roles
        </span>
      </div>
      <div className="filter-row">
        <button className="filter-chip active">All</button>
        <button className="filter-chip">Engineering</button>
        <button className="filter-chip">Design</button>
        <button className="filter-chip">Product</button>
        <button className="filter-chip">Remote only</button>
        <button className="filter-chip">Closing soon</button>
      </div>

      <div className="job-card">
        <div className="job-card-top">
          <div className="job-logo">NX</div>
          <div className="job-info">
            <div className="job-title">Senior Backend Engineer - Node.js</div>
            <div className="job-company">
              Nexus Systems · Cape Town, SA (Hybrid)
            </div>
          </div>
          <div className="job-badges">
            <span className="badge badge-verified">✓ Verified</span>
            <span className="badge badge-remote">Hybrid</span>
            <span className="badge badge-type">Full-time</span>
          </div>
        </div>
        <div className="job-meta">
          <span>R45k - R65k / month</span>
          <span>Posted 3 days ago</span>
          <span>14 applicants</span>
          <span>Feedback rate: 94%</span>
        </div>
        <div className="deadline-bar">
          <span className="deadline-label">Response window</span>
          <div className="deadline-track">
            <div className="deadline-fill fill-green" styles="width:78%"></div>
          </div>
          <span className="deadline-days">11 days left</span>
        </div>
      </div>
      <div className="job-card">
        <div className="job-card-top">
          <div className="job-logo">MV</div>
          <div className="job-info">
            <div className="job-title">Product Designer — Mobile</div>
            <div className="job-company">
              Mova Labs · Remote (Africa timezone)
            </div>
          </div>
          <div className="job-badges">
            <span className="badge badge-verified">✓ Verified</span>
            <span className="badge badge-remote">Remote</span>
            <span className="badge badge-type">Contract</span>
          </div>
        </div>
        <div className="job-meta">
          <span>R54k - R81k / month</span>
          <span>Posted 6 days ago</span>
          <span>31 applicants</span>
          <span>Feedback rate: 100%</span>
        </div>
        <div className="deadline-bar">
          <span className="deadline-label">Response window</span>
          <div className="deadline-track">
            <div className="deadline-fill fill-amber" styles="width:30%"></div>
          </div>
          <span className="deadline-days">3 days left</span>
        </div>
      </div>
      <div className="job-card">
        <div className="job-card-top">
          <div className="job-logo">FK</div>
          <div className="job-info">
            <div className="job-title">Engineering Manager</div>
            <div className="job-company">Forkway Inc. · Johannesburg, SA</div>
          </div>
          <div className="job-badges">
            <span className="badge badge-">✓ Verified</span>
            <span className="badge badge-">1 flag on record</span>
            <span className="badge badge-">Full-time</span>
          </div>
        </div>
        <div className="job-meta">
          <span>R75k - R95k / month</span>
          <span>Posted 1 day</span>
          <span>8 applicants</span>
          <span>Feedback rate: 71%</span>
        </div>
        <div className="deadline-bar">
          <span className="deadline-label">Response window</span>
          <div className="deadline-track">
            <div className="deadline-fill fill-green" styles="width:93%"></div>
          </div>
          <span className="deadline-days">18 days left</span>
        </div>
      </div>

      <p className="flag-note">
        Forkway Inc. has 1 flag on record for a missed response window in a
        previous cycle. A second flag will result in a 30-day posting
        suspension. A third flag results in permanent removal.
      </p>
    </div>
  );
};

export default Jobs;
