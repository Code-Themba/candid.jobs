import { useState } from "react";

const TEMPLATES = {
  skills: (
    <>
      Thank you for applying for the <strong>Senior Backend Engineer</strong>{" "}
      role. After careful review, we aren't moving forward at this stage. The
      primary reason: <strong>skills gap</strong> — the role requires hands-on
      experience with distributed message queues (Kafka/RabbitMQ) that wasn't
      reflected in your application materials. We genuinely appreciate your
      time.
    </>
  ),
  exp: (
    <>
      Thank you for applying for the <strong>Engineering Manager</strong> role.
      We aren't progressing your application at this time. The primary reason:{" "}
      <strong>experience level</strong> — we're looking for 5+ years in a direct
      people-management capacity, and your background is closer to senior
      individual contributor. This isn't a reflection of the quality of your
      work. We'd encourage you to revisit as your career progresses.
    </>
  ),
  salary: (
    <>
      Thank you for your interest in the <strong>Product Designer</strong> role.
      Unfortunately we won't be proceeding. The primary reason:{" "}
      <strong>salary misalignment</strong> — your stated expectations sit above
      the budgeted band for this position. We didn't want to waste your time
      with an interview process given this constraint.
    </>
  ),
  cancelled: (
    <>
      We're reaching out regarding your application for the{" "}
      <strong>UX Researcher</strong> role. We need to let you know this listing
      has been <strong>cancelled</strong> — the headcount was withdrawn during a
      budget review. This has no reflection on your application. We're sorry for
      the disruption to your search.
    </>
  ),
};

const TABS = [
  { key: "onboarding", label: "Onboarding & contract" },
  { key: "flags", label: "Flag system" },
  { key: "dashboard", label: "Employer dashboard" },
  { key: "feedback", label: "Feedback rules" },
];

const OnBoardingSection = () => {
  return (
    <div id="tab-onboarding" className="section active">
      <div className="onboard-steps">
        <div className="os-card">
          <div className="os-num">01</div>
          <div className="os-title">Business verification</div>
          <div className="os-desc">
            Company registration number, VAT/tax ID, and a verified business
            domain email are required before account creation.
          </div>
          <span className="os-status os-required">Required</span>
        </div>
        <div className="os-card">
          <div className="os-num">02</div>
          <div className="os-title">HR contact confirmation</div>
          <div className="os-desc">
            A named HR or hiring manager contact must be confirmed. Their email
            is linked to all postings and cannot be changed mid-cycle.
          </div>
          <span className="os-status os-required">Required</span>
        </div>
        <div className="os-card">
          <div className="os-num">03</div>
          <div className="os-title">Accountability contract</div>
          <div className="os-desc">
            Employers digitally sign a binding set of posting obligations before
            their first live listing goes up.
          </div>
          <span className="os-status os-required">Required</span>
        </div>
        <div className="os-card">
          <div className="os-num">04</div>
          <div className="os-title">ATS integration (optional)</div>
          <div className="os-desc"></div>
          <span className="os-status os-auto">
            Optional - earn Verified badged
          </span>
        </div>
      </div>
      <div className="contract-box">
        <h3>The posting obligations contract (summary)</h3>
        <div className="clause">
          <div className="clause-dot"></div>
          All roles posted ,ust be actively budgeted and approved for hire at
          time of listing. Speculative pipeline building is a violation.
        </div>
        <div className="clause">
          <div className="clause-dot"></div>A responsive window of 7, 14, or 21
          days must be selected at posting. This is public commitment visible to
          every applicant.
        </div>
        <div className="clause">
          <div className="clause-dot"></div>
          Every applicant who applies within the window must receive a response
          - positive, negative, or a documented role withdrawal - before the
          deadline.
        </div>
        <div className="clause">
          <div className="clause-dot"></div>
          Rejections must include a specific, non-boilerplate reason drawn from
          the approved taxonomy, with an optional freetext supplement.
        </div>
        <div className="clause">
          <div className="clause-dot"></div>
          If a role is cancelled or paused after posting, all active applicants
          must be notified within 48 hours. The listing is closed immediately.
        </div>
        <div className="clause">
          <div className="clause-dot"></div>
          Violations of any clause trigger the flag escalation system. Three
          flags result in permanent platform removal with no refund of listing
          fees.
        </div>
      </div>
    </div>
  );
};

const FlagsSection = () => {
  return (
    <div>
      <div className="flag-tier-row">
        <div className="flag-tier ft-warn">
          <div className="ft-num ft-num-warn">1</div>
          <div className="ft-label ft-label-warn">First flag</div>
          <div className="ft-action ft-action-warn">Formal warning issued</div>
          <div className="ft-desc ft-desc-warn">
            Public flag displayed on company profile and all active listings.
            Employer receives a detailed remediation notice. No posting
            suspension yet. Seekers can see the flag — transparency is the
            pressure.
          </div>
        </div>
        <div className="flag-tier ft-susp">
          <div className="ft-num ft-num-susp">2</div>
          <div className="ft-label ft-label-susp">Second flag</div>
          <div className="ft-action ft-action-susp">
            30-day posting suspension
          </div>
          <div className="ft-desc ft-desc-susp">
            All active listings are paused. Existing applicants are notified.
            Employer must complete a mandatory accountability review before
            reinstatement. Any pending listing fees are held.
          </div>
        </div>
        <div className="flag-tier ft-ban">
          <div className="ft-num ft-num-ban">3</div>
          <div className="ft-label ft-label-ban">Third flag</div>
          <div className="ft-action ft-action-ban">Permanent removal</div>
          <div className="ft-desc ft-desc-ban">
            Account suspended permanently. Company name added to the public
            Removed Employers registry. No refund of outstanding listing fees.
            May appeal once within 90 days with evidence of systemic change.
          </div>
        </div>
      </div>

      <div className="flaggable-section">
        <h3>What triggers a flag</h3>
        <div className="flaggable-grid">
          <div className="fg-item">
            <div className="fg-type fg-type-auto">Auto-triggered</div>
            <div className="fg-title">Missed response window</div>
            <div className="fg-desc">
              System detects one or more applicants with no status update when
              the response window expires. No manual review needed.
            </div>
          </div>
          <div className="fg-item">
            <div className="fg-type fg-type-mod">Moderation review</div>
            <div className="fg-title">Boilerplate feedback detected</div>
            <div className="fg-desc">
              NLP layer flags generic or templated rejection reasons. Sent back
              to employer for revision; repeated failure escalates to a flag.
            </div>
          </div>
          <div className="fg-item">
            <div className="fg-type fg-type-auto">Auto-triggered</div>
            <div className="fg-title">Role cancelled without notice</div>
            <div className="fg-desc">
              Listing removed or expired without sending status updates to
              active applicants within the 48-hour window.
            </div>
          </div>
          <div className="fg-item">
            <div className="fg-type fg-type-report">Seeker-reported</div>
            <div className="fg-title">Misrepresented role</div>
            <div className="fg-desc">
              Three or more seekers report that an interview/offer differed
              materially from the posted description. Triggers a moderation
              investigation.
            </div>
          </div>
          <div className="fg-item">
            <div className="fg-type fg-type-report">Seeker-reported</div>
            <div className="fg-title">Ghost job suspected</div>
            <div className="fg-desc">
              Seeker flags a role they believe was never real. Cross-checked
              against ATS data or HR contact. Confirmed ghost jobs result in
              immediate flag + listing removal.
            </div>
          </div>
          <div className="fg-item">
            <div className="fg-type fg-type-mod">Moderation review</div>
            <div className="fg-title">Discriminatory feedback language</div>
            <div className="fg-desc">
              Rejection reasons containing protected-characteristic language are
              flagged instantly and reviewed by the trust & safety team.
            </div>
          </div>
        </div>
      </div>

      <div className="appeal-box">
        <h3>The appeal process</h3>
        <p>
          Employers may appeal any flag within 14 days by submitting documented
          evidence (ATS logs, email threads, HR records) showing the violation
          was erroneous or was caused by a documented technical failure on
          Candid's side. Appeals are reviewed within 5 business days by a
          two-person trust panel. Successful appeals remove the flag from the
          record. Unsuccessful appeals stand, and the flag count remains.
        </p>
      </div>
    </div>
  );
};

const DashboardSection = ({ onRespondNow }) => {
  return (
    <div>
      <div className="dash-grid">
        <div className="dash-metric">
          <div className="dm-num dm-good">97%</div>
          <div className="dm-label">Response rate (all time)</div>
        </div>
        <div className="dash-metric">
          <div className="dm-num dm-good">4.6</div>
          <div className="dm-label">Seeker satisfaction avg.</div>
        </div>
        <div className="dash-metric">
          <div className="dm-num dm-warn">1</div>
          <div className="dm-label">Active flags on record</div>
        </div>
        <div className="dash-metric">
          <div className="dm-num dm-neutral">3</div>
          <div className="dm-label">Active listings</div>
        </div>
      </div>
      <div className="active-postings">
        <h3>Active listings</h3>
        <div className="posting-row">
          <div className="pr-top">
            <div>
              <div className="pr-title">Senior Backend Engineer - Node.js</div>
              <div className="pr-meta">
                Posted 3 days ago · 14 applicants · 2 pending responses
              </div>
            </div>
            <div className="pr-right">
              <span className="badge badge-ok">On track</span>
              <span className="badge badge-neutral">14-day window</span>
            </div>
          </div>
          <div className="pr-progress">
            <span className="pr-prog-label">Window remaining</span>
            <div className="prog-track">
              <div
                className="prog-fill pf-green"
                styles={{ width: "79%" }}
              ></div>
            </div>
            <span className="pr-days">11 days left</span>
          </div>
        </div>
        <div className="posting-row">
          <div className="pr-top">
            <div>
              <div className="pr-title">UX Researcher</div>
              <div className="pr-meta">
                Posted 11 days ago · 9 applicants · 5 pending responses
              </div>
            </div>
            <div className="pr-right">
              <span className="badge badge-warn">Action needed</span>
              <span className="badge badge-neutral">14-day window</span>
            </div>
          </div>
          <div className="pr-progress">
            <span className="pr-prog-label">Window remaining</span>
            <div className="prog-track">
              <div className="prog-fill pf-amber" styles="width:21%"></div>
            </div>
            <span className="pr-days">3 days left</span>
          </div>
        </div>
        <div className="posting-row">
          <div className="pr-top">
            <div>
              <div className="pr-title">Engineering Manager</div>
              <div className="pr-meta">
                Posted 1 day ago · 8 applicants · 8 pending responses
              </div>
            </div>
            <div className="pr-right">
              <span className="badge badge-ok">On track</span>
              <span className="badge badge-neutral">21-day window</span>
            </div>
          </div>
          <div className="pr-progress">
            <span className="pr-prog-label">Window remaining</span>
            <div className="prog-track">
              <div className="prog-fill pf-green" styles="width:95%"></div>
            </div>
            <span className="pr-days">19 days left</span>
          </div>
        </div>
      </div>

      <div className="action-queue">
        <h3>Action queue</h3>
        <div className="aq-item">
          <div className="aq-urgency urg-high"></div>
          <div className="aq-content">
            <div className="aq-label">
              5 applicants awaiting a response - UX Researcher
            </div>
            <div className="aq-desc">
              Window closes in 3 days. Unresponded applications after deadline
              will trigger an automatic flag.
            </div>
          </div>
          <button className="aq-action" onClick={onRespondNow}>
            Respond now →
          </button>
        </div>
        <div className="aq-item">
          <div className="aq-urgency urg-med"></div>
          <div className="aq-content">
            <div className="aq-label">
              Feedback flagged as too generic - 1 rejection
            </div>
            <div className="aq-desc">
              Your rejection for Aisha M. on the Backend Engineer role was
              returned. Revise before it escalates.
            </div>
          </div>
          <button className="aq-action">Revise feedback →</button>
        </div>
        <div className="aq-item">
          <div className="aq-urgency urg-low"></div>
          <div className="aq-content">
            <div className="aq-label">
              Seeker review received — Engineering Manager
            </div>
            <div className="aq-desc">
              Candidate left a process review. 4/5 stars. No action required —
              visible on your public profile.
            </div>
          </div>
          <button className="aq-action">View review →</button>
        </div>
      </div>
    </div>
  );
};

/*-------- Feeback Rules --------*/
const TEMPLATE_CHIPS = [
  {
    key: "skills",
    label: "Skills gap",
  },
  {
    key: "exp",
    label: "Experience level",
  },
  { key: "salary", label: "Salary misalignment" },
  { key: "cancelled", label: "Role cancelled" },
];

const FeedbackSection = () => {
  const [activeTemplate, setActiveTemplate] = useState("skills");
  return (
    <div>
      <div className="fb-rule-grid">
        <div className="fb-rule">
          <span className="fb-tag fb-tag-req">Required</span>
          <h4>Primary rejection reason</h4>
          <p>
            Must be selected from the approved taxanomy: skills gap, experience
            level, role cancelled, stronger candidate selected, culture/team
            fit, over-qualified, position filled internally, salary
            misalignment.
          </p>
        </div>
        <div className="fb-rule">
          <span className="fb-tag fb-tag-opt">Optional</span>
          <h4>Freetext supplement</h4>
          <p>
            Employers may add up to 300 characters of additional context.
            Encouraged but never required - the structured reason alone
            satisfies the obligation.
          </p>
        </div>
        <div className="fb-rule">
          <span className="fb-tag fb-tag-block">Blocked</span>
          <h4>Protected-characteristic language</h4>
          <p>
            Any mention of age, gender, race, nationality, religion, disability,
            or family status in feedback triggers an immediate hold and trust
            &amp; safety review.
          </p>
        </div>
        <div className="fb-rule">
          <span className="fb-tag fb-tag-block">Blocked</span>
          <h4>Boilerplate detection</h4>
          <p>
            Phrases like "We'll keep your CV on file", "We've gone in another
            direction", or near-identical feedback sent to 5+ applicants are
            flagged by the NLP layer and bounced back.
          </p>
        </div>
      </div>
      <div className="template-preview">
        <div className="tp-label">Approved feedback examples</div>

        <div className="tp-select-row">
          {TEMPLATE_CHIPS.map(({ key, label }) => (
            <button
              key={key}
              className={`tp-chip ${activeTemplate === key ? "sel" : ""}`}
              onClick={() => setActiveTemplate(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="tp-preview">{TEMPLATES[activeTemplate]}</div>
        <div className="blocked-example">
          <div className="block-icon">X</div>
          <div>
            This response would be blocked:{" "}
            <em>
              "Thank you for your application. After careful consideration we
              have decided to move forward with other candidates. We wish you
              all the best in your job search."
            </em>
            - No specific reason given. Sent to 18 applicants identically.
            Flagged as boilerplate.
          </div>
        </div>
      </div>
    </div>
  );
};

const Accountability = ({ onRespondNow }) => {
  const [activeTab, setActiveTab] = useState("onboarding");
  const handleRespondNow = onRespondNow ?? (() => {});

  const SECTIONS = {
    onboarding: <OnBoardingSection />,
    flags: <FlagsSection />,
    dashboard: <DashboardSection onRespondNow={handleRespondNow} />,
    feedback: <FeedbackSection />,
  };

  return (
    <div className="root">
      <p className="page-label">Candid.jobs - employer system</p>
      <h1 className="page-title">
        The accountability <em>framework</em>
      </h1>
      <p className="page-sub">
        How we make employers actually responsible - not just morally, but
        structually. Every posting carries obligations. Every obligation has
        consequences.
      </p>
      {/* Tab nav */}
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conditional Rendering of Tab Panels */}
      {SECTIONS[activeTab]}
    </div>
  );
};

export default Accountability;
