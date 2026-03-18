import React from "react";

const Footer = () => {
  return (
    <div className="cj-footer">
      <div className="cj-footer-inner">
        <div className="cj-footer-brand cj-footer-col">
          <div className="cj-footer-logo">
            Candid<span>.</span>jobs
          </div>
          <p className="cj-footer-tagline">
            The job board that holds employers accountable. Every listing
            verified. Every applicant answered.
          </p>
        </div>

        <div className="cj-footer-col">
          <h4>For seekers</h4>
          <ul>
            <li>
              <a href="/jobs">Browse verified jobs</a>
            </li>
            <li>
              <a href="/onboarding">Create profile</a>
            </li>
            <li>
              <a href="/dashboard">My applications</a>
            </li>
            <li>
              <a href="/feedback">My feedback log</a>
            </li>
          </ul>
        </div>

        <div className="cj-footer-col">
          <h4>For employers</h4>
          <ul>
            <li>
              <a href="/post">Post a job</a>
            </li>
            <li>
              <a href="/accountability">Accountability system</a>
            </li>
            <li>
              <a href="/verification">Verification process</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
          </ul>
        </div>

        <div className="cj-footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/trust">Trust & safety</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="cj-footer-bottom">
        <span>
          © ${new Date().getFullYear()} Candid.jobs — All rights reserved
        </span>
        <div className="cj-footer-links">
          <a href="/privacy">Privacy policy</a>
          <a href="/terms">Terms of service</a>
          <a href="/cookies">Cookie policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
