import React from "react";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="logo">
        Candid <span>.</span>jobs
      </div>
      <ul className="nav-links">
        <li>How it works</li>
        <li>For Employers</li>
        <li>Accountability</li>
      </ul>
      <button className="btn-nav">Post a job</button>
    </nav>
  );
};

export default Navbar;
