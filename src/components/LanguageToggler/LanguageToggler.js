import React from "react";
import { withLocalize } from "react-localize-redux";
import "./LanguageToggler.css";
import vn from "../../images/vn.png";
import en from "../../images/eng.png";
const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => (
  <ul className="navbar-nav ">
    {languages.map(lang => (
      <button
        className="nav-item active"
        style={{ all: "unset" }}
        onClick={() => setActiveLanguage(lang.code)}
      >
        <a className="nav-link lang-icon">
          {lang.code === "en" ? <img src={en} /> : <img src={vn} />}
        </a>
      </button>
    ))}
  </ul>
);

export default withLocalize(LanguageToggle);
