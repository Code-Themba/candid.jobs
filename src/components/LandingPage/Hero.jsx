import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <p className="hero-eyebrow">No ghosts. No silence. No Excuses.</p>
      <h1>
        Job hunting that <em>actually</em> respects your time.
      </h1>
      <p>
        Every listing is verified as live. Every employer is contractually
        obligated to respond. Every outcome - accepted, rejected, or withdrawn -
        gets communicated with real feedback.
      </p>
      <div className="hero-cta">
        <button
          className="btn-primary"
          onclick="sendPrompt('Walk me through how the job verification process works on Candid.jobs')"
        >
          Find verified jobs ↗
        </button>
        <button
          className="btn-secondary"
          onclick="sendPrompt('What does the employer accountability system look like on Candid.jobs?')"
        >
          Employer accountability →
        </button>
      </div>
    </section>
  );
};

export default Hero;
