import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Task({ e }) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const [description, setDescription] = useState('This task has no description');
  //   console.log(location);
  return (
    <div className="containerTask">
      <button
        className="buttonNavigate"
        type="submit"
        onClick={() => (navigate('/'))}
      >
        ⨉
      </button>
      <div className="taskBody">
        <div className="taskTextH1">{title}</div>
        <textarea className="taskTextH3">{description}</textarea>
      </div>
    </div>

  );
}

export default Task;
