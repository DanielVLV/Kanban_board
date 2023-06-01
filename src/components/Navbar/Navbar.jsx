/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

function Navbar() {
  const [dropMenu, setDropMenu] = useState(false);

  function handleProfile() {
    setDropMenu(true);
  }

  function handleVisible() {
    setDropMenu(true);
  }

  function handleUnVisible() {
    setDropMenu(false);
  }

  return (
    <div className="navbarContainer">
      <div className="navbarText">Awesome Kanban Board</div>
      <div className="blockProfile" onClick={handleProfile}>
        <div className="profilePhoto">
          <img
            className="photo"
            src="/img/profilePhoto.png"
            alt="profilePhoto"
          />
        </div>
        <div className="list">
          <img className="rowImg" src="/img/row.png" alt="list" />
        </div>
        {dropMenu && (
          <div
            className="dropMenu"
            onMouseEnter={handleVisible}
            onMouseLeave={handleUnVisible}
          >
            <div className="rhombus" />
            <div className="dropMenuText">
              <div>Profile</div>
              <div>Log Out</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
