import React from 'react';
import Header from './components/Header';
import MatrixCanvas from './components/MatrixCanvas';
import Terminal from './components/Terminal.js';
import Milestones from './components/Milestones';
import Cards from './components/Cards';
import './App.css';
import './chat.css';

function App() {
  return (
    <div>
      <div className="header-text">OMIX CHATBOT TERMINAL WORKING</div>
      <Header />
      <MatrixCanvas />
      <div className="container">
        <h4>CA: xxxxxxxxxxxxxxxxxxxxxxx</h4>
        <h1>OMIX AI CHATBOT</h1>
        <Cards />
        <Terminal />
        <Milestones />
        {/* <Chat /> */}
      </div>
    </div>
  );
}

export default App;