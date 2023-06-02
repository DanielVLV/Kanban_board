import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Task from './components/Dashboard/Task/Task';

function App() {
  const [counterActive, setCountActive] = useState(0);
  const [counterFinished, setCountFinished] = useState(0);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          index
          element={(
            <Home
              setCountActive={setCountActive}
              setCountFinished={setCountFinished}
            />
)}
        />
        <Route path="/tasks/:id" element={<Task />} />
      </Routes>
      <Footer counterActive={counterActive} counterFinished={counterFinished} />
    </>
  );
}

export default App;
