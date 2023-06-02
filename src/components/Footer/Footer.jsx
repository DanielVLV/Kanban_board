import React from 'react';

function Footer({ counterActive, counterFinished }) {
  return (
    <div className="footerContainer">
      <div>
        <div>
          <span className="tasksCount">
            {`Active tasks: ${counterActive}`}
          </span>
          <span className="tasksCount">
            {`Finished tasks: ${counterFinished}`}
          </span>
        </div>
      </div>
      <div>
        <div className="tasksCount">Kanban board by Yulia, 2023</div>
      </div>
    </div>
  );
}

export default Footer;
