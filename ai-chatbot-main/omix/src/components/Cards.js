import React from 'react';

const Cards = () => (
  <div className="grid">
    <p className='intro'>Discover the future of communication with our cutting-edge AI chatbot! Designed to simplify tasks, provide instant answers, and engage in meaningful conversations, our chatbot is here to assist you 24/7.</p>
    <div className="card">
      <div className="egg-container">
        <div className="egg" onClick={() => alert('Specimen #1337: [PUMPFUN SIGNATURE DETECTED]')}><img src="omix.gif" alt="omix bot" /></div>
      </div>
    </div>
  </div>
);

export default Cards;
