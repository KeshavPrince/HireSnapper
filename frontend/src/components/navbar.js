import React from "react";

export default function NavBar() {
  return (
    <div>
      {/* <nav className="nav-wrapper">
                <div className="container">
                <a href = "/" className="brand-logo">HireSnapper</a>
                <ul className = "right">
                    <li><a href = "/">Home</a></li>
                    <li><a href = "/">About</a></li>
                    <li><a href = "/">Contact Us</a></li>
                    <li><a href = "/authenticate/signup">Join Us</a></li>
                </ul>
                </div>
            </nav> */}
      <div class="topnav">
        <a class="active" href="#home">
          Home
        </a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
    </div>
  );
}
