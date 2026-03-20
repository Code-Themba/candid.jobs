import { useState } from "react";
import { useSendPrompt } from "../Seeker/sendPrompt";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const STEP_LABELS = [
  "Select applicants",
  "Assign outcomes",
  "Compose feedback",
  "Review & send",
];

const ALL_APPLICANTS = [
  {
    id: 1,
    name: "Aisha Mensah",
    init: "AM",
    cls: "av-a",
    role: "UX Researcher · 4 yrs exp",
    days: "Applied 11 days ago",
    status: "pending",
    badge: "b-new",
    blabel: "Pending",
  },
  {
    id: 2,
    name: "Kofi Adjei",
    init: "KA",
    cls: "av-b",
    role: "Senior UX Research · 7 yrs exp",
    days: "Applied 9 days ago",
    status: "pending",
    badge: "b-new",
    blabel: "Pending",
  },
  {
    id: 3,
    name: "Nadia Petrov",
    init: "NP",
    cls: "av-c",
    role: "UX Researcher · 3 yrs exp",
    days: "Applied 8 days ago",
    status: "pending",
    badge: "b-new",
    blabel: "Pending",
  },
  {
    id: 4,
    name: "Tariq Osman",
    init: "TO",
    cls: "av-d",
    role: "Research Lead · 6 yrs exp",
    days: "Applied 7 days ago",
    status: "pending",
    badge: "b-new",
    blabel: "Pending",
  },
  {
    id: 5,
    name: "Leila Hartmann",
    init: "LH",
    cls: "av-e",
    role: "UX Researcher · 2 yrs exp",
    days: "Applied 6 days ago",
    status: "pending",
    badge: "b-new",
    blabel: "Pending",
  },
  {
    id: 6,
    name: "James Okafor",
    init: "JO",
    cls: "av-f",
    role: "Senior Researcher · 5 yrs exp",
    days: "Applied 5 days ago",
    status: "interview",
    badge: "b-int",
    blabel: "Interview",
  },
  {
    id: 7,
    name: "Priya Naidu",
    init: "PN",
    cls: "av-a",
    role: "UX Lead · 8 yrs exp",
    days: "Applied 4 days ago",
    status: "interview",
    badge: "b-int",
    blabel: "Interview",
  },
  {
    id: 8,
    name: "Wole Adeyemi",
    init: "WA",
    cls: "av-b",
    role: "Researcher · 3 yrs exp",
    days: "Applied 3 days ago",
    status: "interview",
    badge: "b-int",
    blabel: "Interview",
  },
  {
    id: 9,
    name: "Sara Kim",
    init: "SK",
    cls: "av-c",
    role: "Principal Researcher · 10 yrs exp",
    days: "Applied 2 days ago",
    status: "advanced",
    badge: "b-adv",
    blabel: "Advanced",
  },
];

const FILTER_CHIPS = [
  { key: "all", label: "All (9)" },
  { key: "pending", label: "Pending response (5)" },
  { key: "interview", label: "In progress (3)" },
  { key: "advanced", label: "Advanced (1)" },
];

const GROUP_OPTIONS = [
  {
    key: "reject",
    icon: "✕",
    iconCls: "gci-red",
    title: "Not progressing",
    desc: "These applicants will not be moving forward. A specific reason is required.",
  },
  {
    key: "interview",
    icon: "→",
    iconCls: "gci-green",
    title: "Invite to interview",
    desc: "Move these applicants to the next stage. Interview details can be attached.",
  },
  {
    key: "hold",
    icon: "⏸",
    iconCls: "gci-amber",
    title: "Hold — under review",
    desc: "Acknowledge receipt and let them know a decision is still pending.",
  },
  {
    key: "cancel",
    icon: "◎",
    iconCls: "gci-blue",
    title: "Role cancelled",
    desc: "The position has been withdrawn. All applicants must be notified within 48 hours.",
  },
];

const OUTCOME_OPTIONS = [
  { value: "reject", label: "Not progressing" },
  { value: "interview", label: "Invite to interview" },
  { value: "hold", label: "Under review" },
  { value: "cancel", label: "Role cancelled" },
];

const REASON_CHIPS = [
  { key: "skills-gap", label: "Skills gap" },
  { key: "exp-level", label: "Experience level" },
  { key: "stronger-candidate", label: "Stronger candidate selected" },
  { key: "salary", label: "Salary misalignment" },
  { key: "culture-fit", label: "Culture / team fit" },
  { key: "overqualified", label: "Overqualified" },
  { key: "internal", label: "Filled internally" },
];

const REGEN_REASONS = [
  "experience level",
  "skills gap",
  "stronger candidate selected",
  "salary misalignment",
];

const BOILERPLATE_WORDS = [
  "best of luck",
  "on file",
  "other direction",
  "unfortunately",
];

/* ══════════════════════════════════════════════════════════
   STEP PROGRESS BAR
══════════════════════════════════════════════════════════ */

const StepProgress = ({ currentStep }) => {
  return (
    <div className="step-row">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const isDone = n < currentStep;
        const isActive = n === currentStep;

        return (
          <div
            key={n}
            style={{ display: "flex", alignItems: "center", flex: 1 }}
          >
            <div className="spr-item">
              <div
                className={`spr-dot${isDone ? " done" : isActive ? " active" : ""}`}
              >
                {isDone ? "✓" : n}
              </div>
              <div
                className={`spr-label${isDone ? " done" : isActive ? " active" : ""}`}
              >
                {label}
              </div>
            </div>
            {i < STEP_LABELS.length - 1 && <div className="spr-line"></div>}
          </div>
        );
      })}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   STEP 1 — Select applicants
══════════════════════════════════════════════════════════ */

const StepSelect = ({ selected, setSelected, onNext }) => {
  const [filterMode, setFilterMode] = useState("all");

  const filtered =
    filterMode === "all"
      ? ALL_APPLICANTS
      : ALL_APPLICANTS.filter((a) => a.status === filterMode);

  function toggleApplicant(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function selectAll(val) {
    setSelected((prev) => {
      const next = new Set(prev);
      const targets =
        filterMode === "pending"
          ? ALL_APPLICANTS.filter((a) => a.status === "pending")
          : ALL_APPLICANTS;
      targets.forEach((a) => (val ? next.add(a.id) : next.delete(a.id)));
      return next;
    });
  }

  const count = selected.size;

  return (
    <div>
      <div className="card">
        <div className="select-header">
          <span className="sh-title">Select applicants to respond to</span>
          <div className="sh-actions">
            <button className="btn-xs" onClick={() => selectAll(true)}>
              Select all pending
            </button>
            <button className="btn-xs" onClick={() => selectAll(false)}>
              Clear
            </button>
          </div>
        </div>

        <div className="filter-row">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.key}
              className={`fchip${filterMode === chip.key ? " on" : ""}`}
              onClick={() => setFilterMode(chip.key)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div>
          {filtered.map((a) => (
            <div
              key={a.id}
              className="applicant-row"
              onClick={() => toggleApplicant(a.id)}
            >
              <div
                className={`ar-check${selected.has(a.id) ? " checked" : ""}`}
              ></div>
              <div className={`ar-avatar ${a.cls}`}>{a.init}</div>
              <div className="ar-info">
                <div className="ar-name">{a.name}</div>
                <div className="ar-meta">{a.role}</div>
              </div>
              <div className="ar-right">
                <span className={`badge ${a.badge}`}>{a.blabel}</span>
                <span className="ar-days">{a.days}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="sel-summary">
          <span className="ss-count">
            {count} applicant{count !== 1 ? "s" : ""} selected
          </span>
        </div>
      </div>

      <div className="step-nav">
        <span className="nav-hint">Step 1 of 4</span>
        <button className="btn-next" onClick={onNext} disabled={count === 0}>
          Continue →
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   STEP 2 — Assign outcomes
══════════════════════════════════════════════════════════ */

const StepAssign = ({
  selected,
  selectedGroup,
  setSelectedGroup,
  onBack,
  onNext,
}) => {
  const selectedApplicants = ALL_APPLICANTS.filter((a) => selected.has(a.id));

  // Per-applicant overrides: map of id → outcome value
  const [overrides, setOverrides] = useState({});

  function setOverride(id, value) {
    setOverrides((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div>
      <div className="card">
        <div className="sec-label">What outcome applies to this batch?</div>
        <div className="group-grid">
          {GROUP_OPTIONS.map((opt) => (
            <div
              key={opt.key}
              className={`group-card${selectedGroup === opt.key ? " sel" : ""}`}
              onClick={() => setSelectedGroup(opt.key)}
            >
              <div className={`gc-icon ${opt.iconCls}`}>{opt.icon}</div>
              <div className="gc-title">{opt.title}</div>
              <div className="gc-desc">{opt.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="sec-label">Per-applicant outcome override</div>
        <p
          style={{
            fontSize: 13,
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Batch outcome applied above. Override any individual here if needed.
        </p>
        <div className="assign-list">
          {selectedApplicants.map((a) => (
            <div key={a.id} className="assign-row">
              <div className={`ar2-avatar ${a.cls}`}>{a.init}</div>
              <div className="ar2-name">{a.name}</div>
              <select
                className="outcome-select"
                value={overrides[a.id] ?? selectedGroup}
                onChange={(e) => setOverride(a.id, e.target.value)}
              >
                {OUTCOME_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <span className="nav-hint">Step 2 of 4</span>
        <button className="btn-next" onClick={onNext}>
          Continue →
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   STEP 3 — Compose feedback
══════════════════════════════════════════════════════════ */

const StepCompose = ({ onBack, onNext }) => {
  const [selectedReason, setSelectedReason] = useState("exp-level");
  const [templateReason, setTemplateReason] = useState("experience level");
  const [freetext, setFreetext] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const charCount = Math.min(freetext.length, 300);

  const isBoilerplate = BOILERPLATE_WORDS.some((w) =>
    freetext.toLowerCase().includes(w),
  );

  function regenerate() {
    const r = REGEN_REASONS[Math.floor(Math.random() * REGEN_REASONS.length)];
    setTemplateReason(r);
  }

  return (
    <div>
      <div className="card">
        <div className="sec-label">Primary rejection reason</div>
        <p
          style={{
            fontSize: 13,
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          One reason is required. It will appear in all selected applicants'
          feedback unless you personalise individually.
        </p>
        <div className="reason-grid">
          {REASON_CHIPS.map((chip) => (
            <button
              key={chip.key}
              className={`reason-chip${selectedReason === chip.key ? " sel" : ""}`}
              onClick={() => setSelectedReason(chip.key)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="sec-label">Feedback body</div>

        <div className="template-box">
          <div className="tb-label">
            <span>Generated template</span>
            <span className="tb-gen" onClick={regenerate}>
              ↻ Regenerate
            </span>
          </div>
          <div className="template-text">
            Thank you for applying for the <strong>UX Researcher</strong> role
            at Nexus Systems. After careful review, we won't be progressing your
            application at this stage. The primary reason is{" "}
            <span className="placeholder">{templateReason}</span> — the position
            requires 5+ years of dedicated UX research experience, and we found
            your background was at an earlier stage of that journey. We
            genuinely appreciate the effort you put into your application.
          </div>
        </div>

        <label
          style={{
            fontSize: 12,
            color: "var(--color-text-secondary)",
            display: "block",
            marginBottom: 6,
          }}
        >
          Optional: add a personal note (applies to all, or personalise per
          applicant in the next step)
        </label>
        <textarea
          className="freetext"
          rows={3}
          value={freetext}
          onChange={(e) => setFreetext(e.target.value.slice(0, 300))}
          placeholder="Add any extra context — specific skills to develop, encouragement, or notes about the role..."
        />
        <div className="char-count">{charCount} / 300</div>

        <div className={`mod-check ${isBoilerplate ? "mod-fail" : "mod-pass"}`}>
          <span className="mod-icon">{isBoilerplate ? "✕" : "✓"}</span>
          <span>
            {isBoilerplate
              ? 'Boilerplate language detected. Please revise before sending — phrases like "best of luck" or "other candidates" are flagged as non-specific.'
              : "Moderation check passed. Feedback is specific, non-boilerplate, and contains no protected-characteristic language."}
          </span>
        </div>

        <span
          className="preview-toggle"
          onClick={() => setShowPreview((p) => !p)}
        >
          Preview as applicant sees it {showPreview ? "↑" : "↓"}
        </span>

        {showPreview && (
          <div className="preview-card open">
            <strong>From: Nexus Systems · UX Researcher</strong>
            <br />
            <br />
            Thank you for applying for the <strong>UX Researcher</strong> role
            at Nexus Systems. After careful review, we won't be progressing your
            application at this stage. The primary reason is{" "}
            <strong>{templateReason}</strong> — the position requires 5+ years
            of dedicated UX research experience, and we found your background
            was at an earlier stage of that journey. We genuinely appreciate the
            effort you put into your application.
            <br />
            <br />
            <span style={{ color: "var(--color-text-tertiary)", fontSize: 12 }}>
              Responded within 14-day window · Feedback rated by 0 seekers so
              far
            </span>
          </div>
        )}
      </div>

      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <span className="nav-hint">Step 3 of 4</span>
        <button className="btn-next" onClick={onNext}>
          Review & send →
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   STEP 4 — Review & send
══════════════════════════════════════════════════════════ */

const StepReview = ({ selected, onBack, onNext }) => {
  const selectedApplicants = ALL_APPLICANTS.filter((a) => selected.has(a.id));

  return (
    <div>
      <div className="review-summary">
        <div className="rs-card">
          <div className="rs-num">{selectedApplicants.length}</div>
          <div className="rs-label">Applicants receiving feedback</div>
        </div>
        <div className="rs-card">
          <div className="rs-num" style={{ color: "#1D9E75" }}>
            ✓
          </div>
          <div className="rs-label">Moderation check passed</div>
        </div>
        <div className="rs-card">
          <div className="rs-num" style={{ color: "#1D9E75" }}>
            3
          </div>
          <div className="rs-label">Days before deadline</div>
        </div>
      </div>

      <div className="card">
        <div className="sec-label">Confirm recipients and feedback</div>
        <div className="review-rows">
          {selectedApplicants.map((a) => (
            <div key={a.id} className="rev-row">
              <div className={`rr-avatar ${a.cls}`}>{a.init}</div>
              <div className="rr-name">{a.name}</div>
              <span className="rr-reason">Experience level</span>
              <span className="rr-check">✓ Ready</span>
            </div>
          ))}
        </div>
      </div>

      <div className="confirm-box">
        Once sent, feedback <strong>cannot be recalled or edited</strong>. It
        will appear immediately in each applicant's feedback log. Each response
        counts toward your platform response rate. Applicants may rate the
        quality of this feedback — ratings are visible on your public employer
        profile.
      </div>

      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <span className="nav-hint">Step 4 of 4</span>
        <button className="btn-next" onClick={onNext}>
          Send to all {selectedApplicants.length} applicants →
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   STEP 5 — Done
══════════════════════════════════════════════════════════ */

const StepDone = ({ selected, onViewProfile, onContinue }) => {
  return (
    <div>
      <div className="done-wrap">
        <div className="done-mark">✓</div>
        <h2 className="done-title">Feedback sent. Obligation met.</h2>
        <p className="done-sub">
          All {selected.size} applicants have been notified. Their feedback logs
          have been updated. Your response rate remains at 97% — no flag
          triggered.
        </p>
      </div>

      <div className="done-stats">
        <div className="ds-card">
          <div className="ds-num" style={{ color: "#1D9E75" }}>
            {selected.size}
          </div>
          <div className="ds-label">Responses sent this session</div>
        </div>
        <div className="ds-card">
          <div className="ds-num">97%</div>
          <div className="ds-label">Your all-time response rate</div>
        </div>
        <div className="ds-card">
          <div className="ds-num" style={{ color: "#1D9E75" }}>
            0
          </div>
          <div className="ds-label">Flags on your account</div>
        </div>
      </div>

      <div className="done-cta">
        <button className="btn-done-pri" onClick={onViewProfile}>
          View employer profile ↗
        </button>
        <button className="btn-done-sec" onClick={onContinue}>
          Continue building →
        </button>
      </div>
    </div>
  );
};

const BulkResponseFlow = ({ onViewProfile, onContinue }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selected, setSelected] = useState(new Set([1, 2, 3, 4, 5]));
  const [selectedGroup, setSelectedGroup] = useState("reject");
  const sendPrompt = useSendPrompt({
    onPrompt: onViewProfile,
  });
  const goTo = (num) => {
    setCurrentStep(num);
  };
  const STEPS = {
    1: (
      <StepSelect
        selected={selected}
        setSelected={setSelected}
        onNext={() => goTo(2)}
      />
    ),
    2: (
      <StepAssign
        selected={selected}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        onBack={() => goTo(1)}
        onNext={() => goTo(3)}
      />
    ),
    3: <StepCompose onBack={() => goTo(2)} onNext={() => goTo(4)} />,
    4: (
      <StepReview
        selected={selected}
        onBack={() => goTo(3)}
        onNext={() => goTo(5)}
      />
    ),
    5: (
      <StepDone
        selected={selected}
        onViewProfile={() =>
          sendPrompt(
            "What does the employer profile and public trust score look like on Candid.jobs?",
          )
        }
        onContinue={() =>
          sendPrompt(
            "What other screens and flows still need to be designed for Candid.jobs?",
          )
        }
      />
    ),
  };
  return (
    <div className="root">
      {/* Top Bar */}
      <div className="topbar">
        <div>
          <h1 className="tb-title">
            Respond to applicants - <em>UX Researcher</em>
          </h1>
          <p className="tb-sub">
            Nexus Systems · 9 applicants pending · Window closes in 3 days
          </p>
        </div>
      </div>
      {/* Urgency banner */}
      <div className="urgency-banner">
        <div className="ub-dot"></div>
        <div>
          <span className="ub-strong">Action required.</span> 5 applicants have
          not received a response. Missing the deadline will trigger an
          automatic flag on your account. This flow lets you respond to all of
          them in one pass.
        </div>
      </div>

      {/* Step progress - only shown for steps 1 - 4 */}
      {currentStep <= 4 && <StepProgress currentStep={currentStep} />}

      {/* Step panels */}
      {STEPS[currentStep]}
    </div>
  );
};

export default BulkResponseFlow;
