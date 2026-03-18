const Feedback = () => {
  return (
    <div className="feedback-section">
      <div className="section-label">Accountability flow</div>
      <div className="feedback-flow">
        <div className="ff-col">
          <h4>Employer obligations</h4>
          <div className="ff-step">
            <div className="ff-dot dot-teal"></div>
            Post verified, live role only
          </div>
          <div className="ff-step">
            <div className="ff-dot dot-teal"></div>
            Set response window (7-21 days)
          </div>
          <div className="ff-step">
            <div className="ff-dot dot-amber"></div>
            Respond to every applicant within window
          </div>
          <div className="ff-step">
            <div className="ff-dot dot-amber"></div>
            Provide specific, non-boilerplate feedback
          </div>
          <div className="ff-step">
            <div className="ff-dot dot-red"></div>
            Failure = flag. 3 flags = removal
          </div>
        </div>
        <div className="ff-arrow">⇄</div>
        <div className="ff-col">
          <h4>Seeker experience</h4>
          <div className="ff-step">
            <div className="ff-dot dot-blue"></div>Apply to verified listings
            only
          </div>
          <div className="ff-step">
            <div className="ff-dot dot-blue"></div>Guaranteed response within
            deadline
          </div>
          <div className="ff-step">
            <div className="ff-dot dot-blue"></div>Structured feedback on
            outcome
          </div>
          <div className="ff-step">
            <div className="ff-dot dot-gray"></div>Optional: rate the hiring
            process
          </div>
          <div className="ff-step">
            <div className="ff-dot dot-gray"></div>No penalty for skipping
            review
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
