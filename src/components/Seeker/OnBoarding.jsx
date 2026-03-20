import { useState } from "react";
import { useSendPrompt } from "./sendPrompt";

const STEP_LABELS = [
  "Welcome",
  "Account",
  "Preferences",
  "CV upload",
  "Alerts",
  "Done",
];

const ROLE_CHIPS = [
  "Software engineering",
  "Product management",
  "Design / UX",
  "Data & analytics",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "HR & people",
  "DevOps / infra",
  "Legal & compliance",
  "Customer success",
];

const DEFAULT_SELECTED_CHIPS = ["Product management", "Operations"];

const ALERT_OPTIONS = [
  {
    key: "daily",
    title: "Daily digest",
    desc: "New matching listings bundled into one email each morning.",
    freq: "09:00 weekdays",
  },
  {
    key: "instant",
    title: "Instant alerts",
    desc: "Notified the moment a matching verified listing goes live.",
    freq: "Real-time push / email",
  },
  {
    key: "weekly",
    title: "Weekly roundup",
    desc: "A curated weekly summary — useful if you're passively browsing.",
    freq: "Mondays at 08:00",
  },
  {
    key: "none",
    title: "No alerts",
    desc: "Browse on your own schedule. No emails until you ask for them.",
    freq: "Manual only",
  },
];

const EXPECTATIONS = [
  {
    dot: "dot-teal",
    text: "You'll always receive a response before the employer's deadline expires.",
    sub: "The countdown timer is visible on every listing. If they miss it, they get flagged automatically — no chasing required from you.",
  },
  {
    dot: "dot-teal",
    text: "Rejections will include a specific reason — not a form letter.",
    sub: "Boilerplate feedback is detected and bounced back to the employer. You'll get something you can actually learn from.",
  },
  {
    dot: "dot-amber",
    text: "After an outcome, you'll be invited to rate the process.",
    sub: "Entirely optional. Takes 30 seconds. Your review helps other seekers know what working with that company is really like.",
  },
  {
    dot: "dot-blue",
    text: "Your application dashboard tracks every active role in real time.",
    sub: "You'll see the response window countdown, status updates, and your feedback log — all in one place.",
  },
];

/*

    PROGRESS BAR

*/

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="progress-wrap">
      {STEP_LABELS.map((label, i) => {
        const step = i + 1;
        const isDone = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div className="prog-step" key={step}>
            <div
              className={`prog-dot ${isDone ? "done" : isCurrent ? "current" : ""}`}
            >
              {isDone ? "✓" : step}
            </div>
            <div
              className={`prog-label ${isDone ? "done" : isCurrent ? "current" : ""}`}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/*

    STEP COMPONENT

*/

// <------- STEP 1: WELCOME ------->
const StepWelcome = ({ onNext }) => {
  return (
    <div>
      <div className="welcome-hero">
        <div className="wh-mark">✓</div>
        <h2 className="wh-title">No more silence. No more ghost jobs.</h2>
        <p className="wh-sub">
          Candid.jobs is the only job board where every listing is verified as
          real, every employer is contractually obligated to respond, and every
          outcome — yes or no — comes with actual feedback.
        </p>
      </div>

      <div className="promise-row">
        <div className="promise-card">
          <div className="pc-icon">◈</div>
          <div className="pc-title">Verified listings only</div>
          <div className="pc-desc">
            Every role is cross-checked before it goes live. No evergreen
            harvesting, no speculative pipelines.
          </div>
        </div>
        <div className="promise-card">
          <div className="pc-icon">⏱</div>
          <div className="pc-title">Guaranteed responses</div>
          <div className="pc-desc">
            Employers choose a 7–21 day window when posting. Miss it and they
            get flagged. You will hear back.
          </div>
        </div>
        <div className="promise-card">
          <div className="pc-icon">↺</div>
          <div className="pc-title">Structured feedback</div>
          <div className="pc-desc">
            Rejections must include a specific reason — not "we'll keep your CV
            on file." Boilerplate gets bounced back.
          </div>
        </div>
      </div>

      <div className="auth-row">
        <button className="btn-auth btn-email" onClick={onNext}>
          Continue with email →
        </button>
        <button className="btn-auth btn-google">Continue with Google</button>
      </div>
      <p className="sign-in-link">
        Already have an account? <span>Sign in</span>
      </p>
    </div>
  );
};

// STEP 2: ACCOUNT DETAILS
const StepAccount = ({ onBack, onNext }) => {
  return (
    <div>
      <div className="card">
        <div className="sec-label">Account Details</div>
        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">
              First name <span>*</span>
            </label>
            <input
              type="text"
              className="field-input"
              placeholder="Enter your first name..."
            />
          </div>
          <div className="form-field">
            <label className="field-label">
              Last Name <span>*</span>
            </label>
            <input
              type="text"
              className="field-input"
              placeholder="Enter your last name..."
            />
          </div>
          <div className="form-field full">
            <label className="field-label">
              Email Address <span>*</span>
            </label>
            <input
              type="email"
              className="field-input"
              placeholder="Enter email address..."
            />
          </div>
          <div className="form-field full">
            <label className="field-label">
              Password <span>*</span>
            </label>
            <input
              className="field-input"
              type="password"
              placeholder="Min. 10 characters"
            />
          </div>
          <div className="form-field">
            <label className="field-label">City / Region</label>
            <input
              className="field-input"
              type="text"
              placeholder="Cape Town, WC"
            />
          </div>
          <div className="form-field">
            <label className="field-label">Open to remote?</label>
            <select className="field-select" defaultValue="hybrid">
              <option value="onsite">On-site only</option>
              <option value="hybrid">Hybrid or remote</option>
              <option value="remote">Remote only</option>
            </select>
          </div>
        </div>
        <p className="privacy-note">
          Your contact details are never shared with employers until you
          explicitly apply. We don't sell data. We don't send unsolicited
          recruiter messages.
        </p>
      </div>
      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-next" onClick={onNext}>
          Continue →
        </button>
      </div>
    </div>
  );
};

/* ── Step 3: Role preferences ─────────────────────────── */

const StepPreferences = ({ onBack, onNext }) => {
  const [selected, setSelected] = useState(new Set(DEFAULT_SELECTED_CHIPS));
  const [salary, setSalary] = useState(30);
  const [availability, setAvailability] = useState("1month");

  function toggleChip(chip) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(chip) ? next.delete(chip) : next.add(chip);
      return next;
    });
  }

  return (
    <div>
      <div className="card">
        <div className="sec-label">What kind of work are you looking for?</div>
        <p
          style={{
            fontSize: 13,
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Select all that apply — this shapes your feed, not a filter you're
          locked into.
        </p>
        <div className="chip-grid">
          {ROLE_CHIPS.map((chip) => (
            <button
              key={chip}
              className={`chip${selected.has(chip) ? " sel" : ""}`}
              onClick={() => toggleChip(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="sec-label">Compensation & availability</div>
        <div className="pref-row">
          <div className="pref-section">
            <p className="pref-title">
              Minimum salary expectation (ZAR / month)
            </p>
            <div className="salary-row">
              <span className="salary-num">
                R {(salary * 1000).toLocaleString()}
              </span>
              <input
                className="salary-track"
                type="range"
                min="10"
                max="120"
                step="5"
                value={salary}
                onChange={(e) => setSalary(parseInt(e.target.value))}
              />
            </div>
            <p
              style={{
                fontSize: 11,
                color: "var(--color-text-tertiary)",
                marginTop: 6,
              }}
            >
              Roles below this threshold won't appear in your feed.
            </p>
          </div>

          <div className="pref-section">
            <p className="pref-title">When can you start?</p>
            <div className="avail-opts">
              {[
                { value: "immediately", label: "Immediately" },
                { value: "1month", label: "Within 1 month" },
                { value: "3months", label: "1–3 months" },
                { value: "browsing", label: "Just browsing" },
              ].map((opt) => (
                <label key={opt.value} className="avail-opt">
                  <input
                    type="radio"
                    name="avail"
                    checked={availability === opt.value}
                    onChange={() => setAvailability(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-next" onClick={onNext}>
          Continue →
        </button>
      </div>
    </div>
  );
};

/* ── Step 4: CV Upload ────────────────────────────────── */

const StepCVUpload = ({ onBack, onNext, onSkip }) => {
  const [parsed, setParsed] = useState(false);

  return (
    <div>
      <div className="card">
        <div className="sec-label">Upload your CV (optional)</div>

        <div className="upload-box" onClick={() => setParsed(true)}>
          <div className="ub-icon">↑</div>
          <div className="ub-title">Drop your CV here, or click to browse</div>
          <div className="ub-sub">
            PDF or DOCX · Max 5MB · We parse it, we never redistribute it
          </div>
        </div>

        {parsed && (
          <div style={{ marginTop: 12 }}>
            <div className="parse-preview">
              <div className="pp-header">
                <span className="pp-title">Parsed from CV</span>
                <span className="pp-badge">✓ Extracted</span>
              </div>
              <div className="pp-fields">
                <div className="pp-field">
                  <div className="pp-flabel">Name</div>
                  <div className="pp-fval">Amara Nkosi</div>
                </div>
                <div className="pp-field">
                  <div className="pp-flabel">Current title</div>
                  <div className="pp-fval">Senior PM</div>
                </div>
                <div className="pp-field">
                  <div className="pp-flabel">Years experience</div>
                  <div className="pp-fval">6 years</div>
                </div>
                <div className="pp-field">
                  <div className="pp-flabel">Top skills</div>
                  <div className="pp-fval">Roadmapping, SQL, Figma</div>
                </div>
                <div className="pp-field">
                  <div className="pp-flabel">Last employer</div>
                  <div className="pp-fval">Mova Labs</div>
                </div>
                <div className="pp-field">
                  <div className="pp-flabel">Education</div>
                  <div className="pp-fval">BCom, UCT 2018</div>
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 11,
                color: "var(--color-text-tertiary)",
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              Parsed details are editable. Only sent to an employer when you
              click Apply — never pre-shared.
            </p>
          </div>
        )}

        <p className="skip-cv">
          Prefer not to upload? <span onClick={onSkip}>Skip this step →</span>
        </p>
      </div>

      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-next" onClick={onNext}>
          Continue →
        </button>
      </div>
    </div>
  );
};

/* ── Step 5: Alerts + expectations ───────────────────── */

const StepAlerts = ({ onBack, onNext }) => {
  const [selectedAlert, setSelectedAlert] = useState("daily");

  return (
    <div>
      <div className="card">
        <div className="sec-label">Job alert preferences</div>
        <div className="alert-opts">
          {ALERT_OPTIONS.map((opt) => (
            <div
              key={opt.key}
              className={`alert-opt${selectedAlert === opt.key ? " sel" : ""}`}
              onClick={() => setSelectedAlert(opt.key)}
            >
              <div className="ao-title">{opt.title}</div>
              <div className="ao-desc">{opt.desc}</div>
              <div className="ao-freq">{opt.freq}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="sec-label">What to expect when you apply</div>
        <div className="expectation-list">
          {EXPECTATIONS.map((item, i) => (
            <div key={i} className="exp-item">
              <div className={`exp-dot ${item.dot}`}></div>
              <div className="exp-text">
                {item.text}
                <span>{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-next" onClick={onNext}>
          Finish setup →
        </button>
      </div>
    </div>
  );
};

/* ── Step 6: Done ─────────────────────────────────────── */

const StepDone = ({ onViewListings, onSetupDashboard }) => {
  return (
    <div>
      <div className="done-hero">
        <div className="done-mark">✓</div>
        <h2 className="done-title">
          You're in. Welcome to an honest job search.
        </h2>
        <p className="done-sub">
          Your profile is live. Based on your preferences, we've already found
          matching verified listings. Every single one is confirmed as actively
          hiring right now.
        </p>
      </div>

      <div className="done-cards">
        <div className="done-card">
          <div className="dc-num">23</div>
          <div className="dc-label">
            Verified listings matching your profile right now
          </div>
        </div>
        <div className="done-card">
          <div className="dc-num">100%</div>
          <div className="dc-label">
            Of those employers have a clean flag record
          </div>
        </div>
        <div className="done-card">
          <div className="dc-num">4.7</div>
          <div className="dc-label">
            Average seeker satisfaction score across your matches
          </div>
        </div>
      </div>

      <div className="done-cta">
        <button className="btn-go" onClick={onViewListings}>
          See my matched listings ↗
        </button>
        <button className="btn-go-sec" onClick={onSetupDashboard}>
          Set up my dashboard →
        </button>
      </div>
    </div>
  );
};

const OnBoarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const sendPrompt = useSendPrompt({
    onPrompt: onComplete,
  });

  const goTo = (num) => {
    setCurrentStep(num);
  };
  const STEPS = {
    1: <StepWelcome onNext={() => goTo(2)} />,
    2: <StepAccount onBack={() => goTo(1)} onNext={() => goTo(3)} />,
    3: <StepPreferences onBack={() => goTo(2)} onNext={() => goTo(4)} />,
    4: (
      <StepCVUpload
        onBack={() => goTo(3)}
        onNext={() => goTo(5)}
        onSkip={() => goTo(5)}
      />
    ),
    5: <StepAlerts onBack={() => goTo(4)} onNext={() => goTo(6)} />,
    6: (
      <StepDone
        onViewListings={() =>
          sendPrompt(
            "Walk me through the seeker application dashboard on Candid.jobs — tracking statuses, deadlines, and feedback",
          )
        }
        onSetupDashboard={() =>
          sendPrompt("Design the seeker application dashboard on Candid.jobs")
        }
      />
    ),
  };
  return (
    <div className="root">
      <p className="page-label">Candid.jobs - seeker onboarding</p>
      <h1 className="page-title">
        Your <em>honest</em> job search starts here
      </h1>
      <p className="page-sub">
        Six steps. No dark patterns. Your data is never sold. At the end you'll
        only see roles that are verified, live, and obligated to respond to you.
      </p>
      <ProgressBar currentStep={currentStep} />
      {STEPS[currentStep]}
    </div>
  );
};

export default OnBoarding;
