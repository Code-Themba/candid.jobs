import { useState } from "react";
import { useSendPrompt } from "./sendPrompt";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const TABS = [
  { key: "active", label: "Active", count: 8 },
  { key: "feedback", label: "Feedback log", count: 5 },
  { key: "watchlist", label: "Watchlist", count: 4 },
];

const FILTER_CHIPS = ["All", "Pending", "Interview", "Offer"];

const SORT_OPTIONS = [
  "Sort: Deadline soonest",
  "Sort: Applied date",
  "Sort: Company A–Z",
];

const APP_CARDS = [
  {
    id: "mv",
    logo: "MV",
    urgency: "urgent",
    title: "Product Designer — Mobile",
    company: "Mova Labs · Remote (Africa TZ)",
    meta: ["Applied 11 days ago", "R42k–R58k/mo", "14-day window"],
    badges: [
      { cls: "b-urgent", label: "Deadline tomorrow" },
      { cls: "b-pending", label: "Pending response" },
    ],
    deadline: { fill: "dlf-red", width: "7%", label: "1 day left" },
    expandLeft: {
      heading: "Application timeline",
      timeline: [
        { dot: "tl-dot-done", text: "Applied", sub: "Mar 6, 09:41" },
        {
          dot: "tl-dot-done",
          text: "Application confirmed",
          sub: "Mar 6, 09:41",
        },
        {
          dot: "tl-dot-active",
          text: "Awaiting employer response",
          sub: "Deadline: Mar 18 — tomorrow",
        },
        {
          dot: "tl-dot-pending",
          text: "Outcome + feedback",
          sub: null,
          muted: true,
        },
      ],
    },
    expandRight: {
      heading: "What happens if they miss the deadline",
      content: (
        <>
          Mova Labs will be <strong>automatically flagged</strong> by the
          platform at 00:00 on Mar 18 if no response has been issued. You don't
          need to report it — it's handled. You'll be notified and the flag is
          public on their profile.
        </>
      ),
    },
  },
  {
    id: "nx",
    logo: "NX",
    urgency: null,
    title: "Senior Product Manager",
    company: "Nexus Systems · Cape Town (Hybrid)",
    meta: ["Applied 7 days ago", "R65k–R85k/mo", "21-day window"],
    badges: [{ cls: "b-interview", label: "Interview scheduled" }],
    deadline: { fill: "dlf-green", width: "67%", label: "14 days left" },
    expandLeft: {
      heading: "Application timeline",
      timeline: [
        { dot: "tl-dot-done", text: "Applied", sub: "Mar 10, 14:22" },
        { dot: "tl-dot-done", text: "Shortlisted", sub: "Mar 12, 10:05" },
        {
          dot: "tl-dot-active",
          text: "Interview scheduled — Mar 20 at 10:00",
          sub: "Video call · 45 min · Hiring Manager: Sipho D.",
        },
        {
          dot: "tl-dot-pending",
          text: "Outcome + feedback",
          sub: null,
          muted: true,
        },
      ],
    },
    expandRight: {
      heading: "Role notes",
      content:
        "PM role leading their payments product. Team of 4 engineers. Asked for a 5-min product teardown in the interview. Nexus has a 4.8 seeker satisfaction score and no flags.",
    },
  },
  {
    id: "rv",
    logo: "RV",
    urgency: "warn",
    title: "Head of Growth",
    company: "Rova Inc. · Johannesburg (On-site)",
    meta: ["Applied 10 days ago", "R90k–R110k/mo", "14-day window"],
    badges: [
      { cls: "b-warn", label: "3 days left" },
      { cls: "b-pending", label: "Pending response" },
    ],
    deadline: { fill: "dlf-amber", width: "21%", label: "3 days left" },
    expandLeft: {
      heading: "Application timeline",
      timeline: [
        { dot: "tl-dot-done", text: "Applied", sub: "Mar 7, 11:15" },
        {
          dot: "tl-dot-done",
          text: "Application confirmed",
          sub: "Mar 7, 11:15",
        },
        {
          dot: "tl-dot-active",
          text: "Awaiting employer response",
          sub: "Deadline: Mar 21",
        },
      ],
    },
    expandRight: {
      heading: "Company standing",
      content: (
        <>
          Rova Inc. has <strong>1 flag on record</strong> from a missed response
          window 4 months ago. They're within their window. Seeker satisfaction:
          3.9 / 5.
        </>
      ),
    },
  },
  {
    id: "fk",
    logo: "FK",
    urgency: null,
    title: "Operations Lead",
    company: "Forkway Inc. · Cape Town (Remote)",
    meta: ["Applied 2 days ago", "R55k–R70k/mo", "21-day window"],
    badges: [{ cls: "b-pending", label: "Pending response" }],
    deadline: { fill: "dlf-green", width: "90%", label: "19 days left" },
    expandLeft: {
      heading: "Application timeline",
      timeline: [
        { dot: "tl-dot-done", text: "Applied", sub: "Mar 15, 08:30" },
        {
          dot: "tl-dot-done",
          text: "Application confirmed",
          sub: "Mar 15, 08:30",
        },
        {
          dot: "tl-dot-active",
          text: "Awaiting employer review",
          sub: "Plenty of time — no action needed",
        },
      ],
    },
    expandRight: {
      heading: "Company standing",
      content:
        "Forkway has a clean record. Seeker satisfaction score: 4.5 / 5. Their average response time on previous listings was 8 days.",
    },
  },
];

const FEEDBACK_CARDS = [
  {
    id: "bf",
    title: "Senior Product Manager",
    company: "Brightfield Tech · Closed Mar 12",
    reason: "Skills gap",
    reasonStyle: {},
    body: "The role requires deep B2B SaaS experience specifically in enterprise procurement software. Your background in consumer fintech is strong, but the context gap was a deciding factor at this stage. We'd encourage you to revisit if you move into the B2B space.",
    date: "Received Mar 12 · within 7-day window",
    rating: 4,
  },
  {
    id: "sk",
    title: "Product Lead — Marketplace",
    company: "Sokoni Commerce · Closed Mar 8",
    reason: "Stronger candidate selected",
    reasonStyle: {},
    body: "We had an unusually strong applicant pool for this role. You made it to the final two — the decision came down to domain experience in e-commerce logistics, which the selected candidate had directly. Your systems thinking and prioritisation framework in the interview were genuinely impressive.",
    date: "Received Mar 8 · within 14-day window",
    rating: 5,
  },
  {
    id: "zd",
    title: "Head of Product",
    company: "Zara Digital · Closed Feb 28",
    reason: "Role cancelled",
    reasonStyle: { background: "#FAEEDA", color: "#854F0B" },
    body: "We're writing to let you know that this role has been withdrawn following an internal budget review. This decision was made at a leadership level and has no bearing on your application, which was being reviewed positively. We're sorry for the disruption.",
    date: "Received Feb 28 · within 48hr cancellation window",
    rating: 3,
  },
  {
    id: "kh",
    title: "Senior PM — Growth",
    company: "Kasha Health · Closed Feb 22",
    reason: "Experience level",
    reasonStyle: {},
    body: "The role requires 8+ years of PM experience with at least 3 in a senior or lead capacity. Your profile shows 5 years total. We'd genuinely encourage you to apply again in 12–18 months — your portfolio quality stood out.",
    date: "Received Feb 22 · within 14-day window",
    rating: 4,
  },
];

const WATCHLIST_CARDS = [
  {
    id: "tb",
    logo: "TB",
    title: "Director of Product — Fintech",
    meta: "Tundra Bank · Remote · R100k–R130k/mo · Posted 5 days ago",
    closes: "Closes in 16 days",
  },
  {
    id: "sl",
    logo: "SL",
    title: "VP Product — Consumer",
    meta: "Stackline · Hybrid, JHB · R120k–R150k/mo · Posted 8 days ago",
    closes: "Closes in 6 days",
  },
  {
    id: "ql",
    logo: "QL",
    title: "Group Product Manager",
    meta: "Quill Labs · Remote · R85k–R95k/mo · Posted 3 days ago",
    closes: "Closes in 18 days",
  },
  {
    id: "av",
    logo: "AV",
    title: "Product Manager — Platform",
    meta: "Avante Systems · Cape Town hybrid · R60k–R80k/mo · Posted 1 day ago",
    closes: "Closes in 20 days",
  },
];

const Stars = ({ count, total = 5 }) => {
  return (
    <div className="stars">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`star ${i < count ? "lit" : "dim"}`}>
          ★
        </span>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SECTION: ACTIVE APPLICATIONS
══════════════════════════════════════════════════════════ */

const ApplicationCard = ({ card, isExpanded, onToggle }) => {
  return (
    <div
      className={`app-card ${card.urgency ? `${card.urgency}` : ""} ${isExpanded ? "expanded" : ""}`}
      onClick={onToggle}
    >
      <div className="ac-top">
        <div className="ac-logo">{card.logo}</div>
        <div className="ac-main">
          <div className="ac-title">{card.title}</div>
          <div className="ac-company">{card.company}</div>
          <div className="ac-meta">
            {card.meta.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>
        <div className="ac-right">
          {card.badges.map((b, i) => (
            <span key={i} className={`badge ${b.cls}`}>
              {b.label}
            </span>
          ))}
        </div>
      </div>

      <div className="ac-deadline">
        <span className="dl-label">Response window</span>
        <div className="dl-track">
          <div
            className={`dl-fill ${card.deadline.fill}`}
            style={{ width: card.deadline.width }}
          ></div>
        </div>
        <span className="dl-days">{card.deadline.label}</span>
      </div>

      <div className={`ac-expand ${isExpanded ? "open" : ""}`}>
        <div className="expand-grid">
          <div className="ex-block">
            <div className="ex-label">{card.expandLeft.heading}</div>
            <div className="timeline">
              {card.expandLeft.timeline.map((item, i) => (
                <div className="tl-item" key={i}>
                  <div className={`tl-dot ${item.dot}`}></div>
                  <div
                    className={`tl-text ${item.muted ? "ex-content muted" : ""}`}
                  >
                    {item.text}
                    {item.sub && <span>{item.sub}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ex-block">
            <div className="ex-label">{card.expandRight.heading}</div>
            <div className="ex-content">{card.expandRight.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActiveSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="filter-bar">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            className={`filter-chip ${activeFilter === chip ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveFilter(chip);
            }}
          >
            {chip}
          </button>
        ))}
        <div className="filter-sep"></div>
        <select className="sort-select" style={{ marginLeft: "auto" }}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
      {APP_CARDS.map((card) => (
        <ApplicationCard
          key={card.id}
          card={card}
          isExpanded={expandedId === card.id}
          onToggle={() => handleToggle(card.id)}
        />
      ))}
    </div>
  );
};

/*

    SECTION: FEEDBACK LOG

*/

const FeedbackSection = () => {
  return (
    <div>
      {FEEDBACK_CARDS.map((card) => (
        <div className="fb-log-card" key={card.id}>
          <div className="flc-top">
            <div>
              <div className="flc-title">{card.title}</div>
              <div className="flc-company">{card.company}</div>
            </div>
            <span className="flc-reason" style={card.reasonStyle}>
              {card.reason}
            </span>
          </div>
          <div className="flc-body">{card.body}</div>
          <div className="flc-meta">
            <span className="flc-date">{card.date}</span>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-text-tertiary)",
                  marginBottom: 4,
                }}
              >
                Rate this feedback
              </div>
              <Stars count={card.rating} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/*

    SECTION: WATCHLIST

*/

const WatchlistSection = () => {
  return (
    <div>
      <p
        style={{
          fontSize: 13,
          color: "var(--color-text-secondary)",
          marginBottom: "1.25rem",
          lineHeight: 1.6,
        }}
      >
        Roles you've saved but haven't applied to yet. Sorted by deadline -
        apply before the listing closes.
      </p>
      {WATCHLIST_CARDS.map((card) => (
        <div className="wl-card" key={card.id}>
          <div className="wl-logo">{card.logo}</div>
          <div className="wl-info">
            <div className="wl-title">{card.title}</div>
            <div className="wl-meta">{card.meta}</div>
          </div>

          <div className="wl-right">
            <span className="wl-deadline">{card.closes}</span>
            <span
              className="badge b-pending"
              style={{ background: "#E1F5EE", color: "#0F6E56" }}
            >
              ✓ Verified
            </span>
            <button className="btn-apply">Apply now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const ApplicationDashboard = ({ onBrowseListings }) => {
  const [activeTab, setActiveTab] = useState("active");
  const sendPrompt = useSendPrompt({
    onPrompt: onBrowseListings,
  });

  const SECTIONS = {
    active: <ActiveSection />,
    feedback: <FeedbackSection />,
    watchlist: <WatchlistSection />,
  };

  return (
    <div className="root">
      {/* Top Bar */}
      <div className="topbar">
        <div className="tb-left">
          <h1>My applications</h1>
          <p>Last updated: today at 09:14 · Cape Town, ZA</p>
        </div>
        <div className="tb-right">
          <button
            className="btn-sm btn-sm-outline"
            onClick={() =>
              sendPrompt(
                "What does the bulk-respond flow look like for sending feedback to multiple applicants on Candid.jobs?",
              )
            }
          >
            Browse Listings
          </button>
          <div className="avatar">AN</div>
        </div>
      </div>

      {/* Stat Row */}
      <div className="stat-row">
        <div className="stat">
          <div className="stat-num sn-active">8</div>
          <div className="stat-label">Active Applications</div>
        </div>
        <div className="stat">
          <div className="stat-num sn-warn">2</div>
          <div className="stat-label">Awaiting response (urgent)</div>
        </div>
        <div className="stat">
          <div className="stat-num sn-good">1</div>
          <div className="stat-label">Interview stage</div>
        </div>
        <div className="stat">
          <div className="stat-num sn-done">5</div>
          <div className="stat-label">Closed with feedback</div>
        </div>
        <div className="stat">
          <div className="stat-num sn-flag">0</div>
          <div className="stat-label">Employer flags triggered </div>
        </div>
      </div>
      {/* Tab nav */}
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "active" : ""} `}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label} <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>
      {/* Tab panel */}
      {SECTIONS[activeTab]}
    </div>
  );
};

export default ApplicationDashboard;
