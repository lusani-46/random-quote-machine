import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [quotesData, setQuotesData] = useState(null);
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');

  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      const data = await response.json();
      setQuotesData(data);
    };

    fetchData();
  }, []);

  const getRandomQuote = () => {
    return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
  };

  const getQuote = () => {
    const randomQuote = getRandomQuote();
    setCurrentQuote(randomQuote.quote);
    setCurrentAuthor(randomQuote.author);

    const color = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[color];
  };

  useEffect(() => {
    if (quotesData) {
      getQuote();
    }
  }, [quotesData]);

  return (
    <div id="quote-box">
      <div className="quote-text">
        <span className="quote-icon">&ldquo;</span>
        <span id="text">{currentQuote}</span>
      </div>
      <div id="author">- {currentAuthor}</div>
      <div className="buttons">
        <button className="button" id="new-quote" onClick={getQuote}>
          New quote
        </button>
      </div>
    </div>
  );
};

export default App;