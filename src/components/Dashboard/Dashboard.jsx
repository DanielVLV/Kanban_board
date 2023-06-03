import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard({ setCountActive, setCountFinished }) {
  const [addBackLog, setAddBackLog] = useState(true);
  const [backLogInput, setBackLogInput] = useState("");
  const [arrayBackLog, setArrayBackLog] = useState([]);

  const [addReady, setAddReady] = useState(true);
  const [selectedReady, setSelectedReady] = useState("");
  const [arrayReady, setArrayReady] = useState([]);

  const [addInProgress, setAddInProgress] = useState(true);
  const [selectedInProgress, setSelectedInProgress] = useState("");
  const [arrayInProgress, setArrayInProgress] = useState([]);

  const [addFinished, setAddFinished] = useState(true);
  const [selectedFinished, setSelectedFinished] = useState("");
  const [arrayFinished, setArrayFinished] = useState([]);

  function handleCreateBacklog() {
    setAddBackLog(false);
  }

  function handleSubmit() {
    if (backLogInput) {
      arrayBackLog.map((e, i) => {
        if (i === arrayBackLog.length - 1) {
          e.title = backLogInput;
          e.id = uuidv4();
        }
      });
      setArrayBackLog(arrayBackLog.filter((e) => e.title));
      localStorage.setItem("localArrayBackLog", JSON.stringify(arrayBackLog));
    }
    setBackLogInput("");
    setAddBackLog(true);
  }

  const handleChangeReady = (event) => {
    setSelectedReady(event.target.value);
    const selectedOption = event.target.options[event.target.selectedIndex];
    const dataId = selectedOption.getAttribute("data-id");
    if (dataId) {
      const selectedBacklog = arrayBackLog.find((e) => e.id === dataId);
      setArrayBackLog((prev) => prev.filter((e) => e.id !== dataId));
      setArrayReady((prev) => [...prev, selectedBacklog]);
      setAddReady(true);
    }
  };

  const handleChangeInProgress = (event) => {
    setSelectedInProgress(event.target.value);
    const selectedOption = event.target.options[event.target.selectedIndex];
    const dataId = selectedOption.getAttribute("data-id");
    if (dataId) {
      const selectedBacklog = arrayReady.find((e) => e.id === dataId);
      setArrayReady((prev) => prev.filter((e) => e.id !== dataId));
      setArrayInProgress((prev) => [...prev, selectedBacklog]);
      setAddInProgress(true);
    }
  };

  const handleChangeFinished = (event) => {
    setSelectedFinished(event.target.value);
    const selectedOption = event.target.options[event.target.selectedIndex];
    const dataId = selectedOption.getAttribute("data-id");
    if (dataId) {
      const selectedBacklog = arrayInProgress.find((e) => e.id === dataId);
      setArrayInProgress((prev) => prev.filter((e) => e.id !== dataId));
      setArrayFinished((prev) => [...prev, selectedBacklog]);
      setAddFinished(true);
    }
  };

  useEffect(() => {
    setCountActive(arrayBackLog.length);
  }, [arrayBackLog?.length]);

  useEffect(() => {
    setCountFinished(arrayFinished.length);
  }, [arrayFinished?.length]);

  useEffect(() => {
    const localArrayBackLog = JSON.parse(
      localStorage.getItem("localArrayBackLog")
    );
    if (!localArrayBackLog) {
      localStorage.setItem("localArrayBackLog", JSON.stringify([]));
    } else setArrayBackLog(localArrayBackLog);
  }, []);

  useEffect(() => {
    const localArrayReady = JSON.parse(localStorage.getItem("localArrayReady"));
    if (!localArrayReady) {
      localStorage.setItem("localArrayReady", JSON.stringify([]));
    } else setArrayReady(localArrayReady);
  }, []);

  useEffect(() => {
    const localArrayInProgress = JSON.parse(
      localStorage.getItem("localArrayInProgress")
    );
    if (!localArrayInProgress) {
      localStorage.setItem("localArrayInProgress", JSON.stringify([]));
    } else setArrayInProgress(localArrayInProgress);
  }, []);

  useEffect(() => {
    const localArrayFinished = JSON.parse(
      localStorage.getItem("localArrayFinished")
    );
    if (!localArrayFinished) {
      localStorage.setItem("localArrayFinished", JSON.stringify([]));
    } else setArrayFinished(localArrayFinished);
  }, []);

  useEffect(() => {
    localStorage.setItem("localArrayBackLog", JSON.stringify(arrayBackLog));
  }, [arrayBackLog]);

  useEffect(() => {
    localStorage.setItem("localArrayReady", JSON.stringify(arrayReady));
  }, [arrayReady]);

  useEffect(() => {
    localStorage.setItem(
      "localArrayInProgress",
      JSON.stringify(arrayInProgress)
    );
  }, [arrayInProgress]);

  useEffect(() => {
    localStorage.setItem("localArrayFinished", JSON.stringify(arrayFinished));
  }, [arrayFinished]);

  return (
    <div className="dashBoard">
      <div className="dashBoardCategory">
        Backlog
        {arrayBackLog.map((e) => (
          <Link
            className="oneLinkTaskTitle"
            key={e.id}
            to={{
              pathname: `/tasks/${e.id}`,
              search: `?title=${e.title}&category=backLog`,
            }}
          >
            <div className="oneTaskTitle" key={e?.id}>
              {e?.title}
            </div>
          </Link>
        ))}
        {addBackLog ? (
          <button
            className="buttonAddCard"
            type="button"
            onClick={handleCreateBacklog}
          >
            + Add card
          </button>
        ) : (
          <>
            <input
              onChange={(e) => setBackLogInput(e.target.value)}
              type="text"
              className="inputText"
              placeholder="_________________"
              maxLength={30}
            />
            <div>
              <button
                className="buttonSubmit"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
      <div className="dashBoardCategory">
        Ready
        {arrayReady.map((e) => (
          <Link
            className="oneLinkTaskTitle"
            key={e.id}
            to={{
              pathname: `/tasks/${e.id}`,
              search: `?title=${e.title}&category=ready`,
            }}
          >
            <div className="oneTaskTitle" key={e?.id}>
              {e?.title}
            </div>
          </Link>
        ))}
        {addReady ? (
          <button
            className="buttonAddCard"
            type="button"
            onClick={() => setAddReady(false)}
            disabled={!arrayBackLog.length}
          >
            + Add card
          </button>
        ) : (
          <div>
            <select
              className="selectStyle"
              value={selectedReady}
              onChange={handleChangeReady}
            >
              <option />
              {arrayBackLog.map((e) => (
                <option key={e.id} data-id={e.id} value={e.title}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="dashBoardCategory">
        In progress
        {arrayInProgress.map((e) => (
          <Link
            className="oneLinkTaskTitle"
            key={e.id}
            to={{
              pathname: `/tasks/${e.id}`,
              search: `?title=${e.title}&category=inprogress`,
            }}
          >
            <div className="oneTaskTitle" key={e?.id}>
              {e?.title}
            </div>
          </Link>
        ))}
        {addInProgress ? (
          <button
            className="buttonAddCard"
            type="button"
            onClick={() => setAddInProgress(false)}
            disabled={!arrayReady.length}
          >
            + Add card
          </button>
        ) : (
          <div>
            <select
              className="selectStyle"
              value={selectedInProgress}
              onChange={handleChangeInProgress}
            >
              <option />
              {arrayReady.map((e) => (
                <option key={e.id} data-id={e.id} value={e.title}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="dashBoardCategory">
        Finished
        {arrayFinished.map((e) => (
          <Link
            className="oneLinkTaskTitle"
            key={e.id}
            to={{
              pathname: `/tasks/${e.id}`,
              search: `?title=${e.title}&category=finished`,
            }}
          >
            <div className="oneTaskTitle" key={e?.id}>
              {e?.title}
            </div>
          </Link>
        ))}
        {addFinished ? (
          <button
            className="buttonAddCard"
            type="button"
            onClick={() => setAddFinished(false)}
            disabled={!arrayInProgress.length}
          >
            + Add card
          </button>
        ) : (
          <div>
            <select
              className="selectStyle"
              value={selectedFinished}
              onChange={handleChangeFinished}
            >
              <option />
              {arrayInProgress.map((e) => (
                <option key={e.id} data-id={e.id} value={e.title}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
