import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setNumbers(e.target.value);
  };

  const calculateAverage = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const numberArray = numbers.split(',').map(Number);
      const response = await axios.post('http://localhost:8080/api/average', numberArray);
      setAverage(response.data);
    } catch (err) {
      setError('An error occurred while calculating the average');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <form onSubmit={calculateAverage}>
          <label>
            Enter numbers separated by commas:
            <input type="text" value={numbers} onChange={handleInputChange} />
          </label>
          <button type="submit">Calculate</button>
        </form>
        {average !== null && <h2>Average: {average}</h2>}
        {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      </header>
    </div>
  );
}

export default App;