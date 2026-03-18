const Cta = () => {
  return (
    <div className="cta-block">
      <h2>
        Ready to apply somewhere{" "}
        <em styles="font-style:italic; color:#BA7517">real?</em>
      </h2>
      <p>
        Join 12,400 job seekers who've stopped sending applications into the
        void.
      </p>
      <div className="cta-row">
        <button
          className="btn-primary"
          onclick="sendPrompt('What should the onboard flow look like for new job seekers on Candid.jobs?')"
        >
          Create seeker profile ↗
        </button>
        <button
          className="btn-secondary"
          onclick="sendPrompt('Design the employer verification and onboarding process for Candid.jobs')"
        >
          Post as employer →
        </button>
      </div>
    </div>
  );
};

export default Cta;
