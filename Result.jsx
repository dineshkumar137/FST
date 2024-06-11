import React from 'react';

const Result = ({ result }) => {
  const handleInterest = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: result.email, location: result.location }),
      });
      if (response.ok) {
        alert(`Interest shown for ${result.location}`);
      } else {
        console.error('Error sending email', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{result.location}</h2>
      <p>{result.description}</p>
      <button style={styles.button} onClick={handleInterest}>Interested</button>
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

export default Result;
