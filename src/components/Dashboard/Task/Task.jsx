import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Task() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const category = searchParams.get('category');
  const [description, setDescription] = useState('');
  const id = location.pathname.split('/').pop();

  const localArrayBackLog = JSON.parse(localStorage.getItem('localArrayBackLog'));
  const localArrayReady = JSON.parse(localStorage.getItem('localArrayReady'));
  const localArrayInProgress = JSON.parse(localStorage.getItem('localArrayInProgress'));
  const localArrayFinished = JSON.parse(localStorage.getItem('localArrayFinished'));

  let findArray;
  let findLocalName;
  if (category === 'backLog') {
    findArray = localArrayBackLog;
    findLocalName = 'localArrayBackLog';
  }
  if (category === 'ready') {
    findArray = localArrayReady;
    findLocalName = 'localArrayReady';
  }
  if (category === 'inprogress') {
    findArray = localArrayInProgress;
    findLocalName = 'localArrayInProgress';
  }
  if (category === 'finished') {
    findArray = localArrayFinished;
    findLocalName = 'localArrayFinished';
  }

  useEffect(() => {
    const findDescription = findArray.filter((e) => e.id === id);
    if (findDescription[0].description) {
      setDescription(findDescription[0].description);
    }
  }, []);

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleCloseTask() {
    if (findArray) {
      const updatedArray = findArray.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            description,
          };
        }
        return e;
      });
      localStorage.setItem(findLocalName, JSON.stringify(updatedArray));
    }
    navigate('/');
  }

  return (
    <div className="containerTask">
      <button
        className="buttonNavigate"
        type="submit"
        onClick={handleCloseTask}

      >
        ⨉
      </button>
      <div className="taskBody">
        <div className="taskTextH1">{title}</div>
        <textarea
          className="taskTextH3"
          placeholder="This task has no description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>

  );
}

export default Task;
