import React from "react";
import { ThemeToggle } from "../context/ThemeContext";
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
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <ThemeToggle />
        <button className="btn-nav">Post a job</button>
      </div>
    </nav>
  );
};

export default Navbar;
