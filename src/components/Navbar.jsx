import React from 'react';
import '../styles/Navbar.scss';

function Navbar() {
  const today = new Date().toLocaleDateString();

  return (
    <nav className="navbar">
      <h1 className="logo">Todo</h1>
      <div className="nav2">
      <h4 className="date">{today}</h4>
      <i class="ri-account-circle-2-fill"></i>
      </div>
    </nav>
  );
}

export default Navbar;
