import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Filters from './Components/Filters';
import Cards from './Components/Cards';

import './App.css';

function App() {

  
  const [selectedDifficulty,setSelectedDifficulty]=useState("All");

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <div id="body" className='body'>

      <Navbar />

      <Filters onDifficultyChange={handleDifficultyChange}/>

      <Cards selectedDifficulty={selectedDifficulty}/>
    
    </div>
  );
}

export default App;