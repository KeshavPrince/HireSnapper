import React from "react";
import {Link} from "react-router-dom";

export default function NavBar({type}) {
  if(type === "1") {
  return (
    <div>
      <div class="topnav">
        <div className ="brand-name">
        <Link to="/">HireSnapper</Link>
        </div>
        <div className = "right">
        <Link exact to="/">Home</Link>
        <Link to="#contact">Contact</Link>
        <Link to="#about">About</Link>
        <Link to="/authenticate/signup">Join Us</Link>
        </div>
      </div>
    </div>
  );
  }
  else {
    return (
      <div>
        <div class="topnav">
          <div className ="brand-name">
          <Link to="/">HireSnapper</Link>
          </div>
          <div className = "right">
          <Link exact to="/">Home</Link>
          <Link to="#contact">Contact</Link>
          <Link to="#about">About</Link>
          <Link to="/authenticate/signup">Profile</Link>
          </div>
        </div>
      </div>
    );
  }
}
