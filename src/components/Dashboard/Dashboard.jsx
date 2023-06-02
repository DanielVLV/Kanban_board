/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ setCountActive, setCountFinished }) {
  const [arrayBackLog, setArrayBackLog] = useState([]);
  const [addBackLog, setAddBackLog] = useState(true);
  const [backLogInput, setBackLogInput] = useState('');

  function handleCreateBacklog() {
    setAddBackLog(false);
    setArrayBackLog((prev) => [...prev, { id: uuidv4() }]);
  }

  function handleSubmit() {
    if (backLogInput) {
      arrayBackLog.map((e, i) => {
        if (i === arrayBackLog.length - 1) {
          e.title = backLogInput;
        }
      });
      setArrayBackLog(arrayBackLog.filter((e) => e.title));
      localStorage.setItem('localArrayBackLog', JSON.stringify(arrayBackLog));
    }
    setBackLogInput('');
    setAddBackLog(true);
  }

  useEffect(() => {
    const localArrayBackLog = JSON.parse(localStorage.getItem('localArrayBackLog'));
    if (!localArrayBackLog) localStorage.setItem('localArrayBackLog', JSON.stringify([]));
    else setArrayBackLog(localArrayBackLog);
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="dashBoard">
      <div className="dashBoardCategory">
        Backlog
        {arrayBackLog.map((e) => (
          <Link to={{ pathname: `/tasks/${e.id}`, search: `?title=${e.title}` }}>
            <div key={e?.id}>{e?.title}</div>
          </Link>
        ))}
        {addBackLog
          ? (
            <button
              className="buttonAddCard"
              type="button"
              onClick={handleCreateBacklog}
            >
              + Add card
            </button>
          )
          : (
            <>
              <input onChange={(e) => setBackLogInput(e.target.value)} type="text" />
              <button
                className="buttonSubmit"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </>
          )}
      </div>
      <div className="dashBoardCategory">
        Ready
        <button
          className="buttonAddCard"
          type="button"
          // onClick={}
        >
          + Add card
        </button>
      </div>
      <div className="dashBoardCategory">
        In progress
        <button
          className="buttonAddCard"
          type="button"
          // onClick={handleCreateCard}
        >
          + Add card
        </button>
      </div>
      <div className="dashBoardCategory">
        Finished
        <button
          className="buttonAddCard"
          type="button"
          // onClick={handleCreateCard}
        >
          + Add card
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
