import React, { useState } from 'react';
import Result from './Result';

const Searchhouse = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error('Error fetching data', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Search for a Location</h1>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter location"
        style={styles.input}
      />
      <button style={styles.button} onClick={handleSearch}>Search</button>
      <div>
        {results.map(result => (
          <Result key={result._id} result={result} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  input: {
    marginRight: '10px',
    padding: '5px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  button: {
    padding: '5px 10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default Searchhouse;
