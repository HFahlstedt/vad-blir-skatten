import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [menuIsActive, setMenuIsActive] = useState(false);

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item title">Vad blir skatten?</a>
        </Link>
        <a
          role="button"
          className={`navbar-burger burger ${menuIsActive ? "is-active" : ""}`}
          onClick={() => setMenuIsActive(!menuIsActive)}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMain"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarMain" className={`navbar-menu ${menuIsActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link href="/salary">
            <a className="navbar-item">Endast lön</a>
          </Link>
          <Link href="/benefit">
            <a className="navbar-item">Med förmån</a>
          </Link>
          <Link href="/raise">
            <a className="navbar-item">Efter löneförhöjning</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Header;
