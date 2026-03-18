const PillarSection = () => {
  return (
    <>
      <div className="section-label">The four pillars</div>
      <div className="pillars">
        <div className="pillar-card">
          <div className="pillar-icon amber">✓</div>
          <h3>Verified Listings</h3>
          <p>
            Jobs are cross-checked aagainst company HR systems or direct contact
            before going live. No speculative pipelines, no evergreen
            harvesting.
          </p>
        </div>
        <div className="pillar-card">
          <div className="pillar-icon teal">⏱</div>
          <h3>Mandatory response windows</h3>
          <p>
            Employers choose a window (7-21 days) when posting. The clock is
            visible on every listing. Miss the window and the company is
            automatically flagged.
          </p>
        </div>
        <div className="pillar-card">
          <div className="pillar-icon blue">◈</div>
          <h3>Structured feedback</h3>
          <p>
            Employers must provide a specific, non-generic rejection reason.
            Vague boilerplate is flagged by our moderation layer and bounced
            back for revision.
          </p>
        </div>
        <div className="pillar-card">
          <div className="pillaricon coral">↺</div>
          <h3>Seeker reviews (voluntary)</h3>
          <p>
            Candidates can rate the process - communication, fairness, clarity
            of role. No consequences for skipping, but high response rates earn
            employers a transparency badge.
          </p>
        </div>
      </div>
    </>
  );
};

export default PillarSection;
