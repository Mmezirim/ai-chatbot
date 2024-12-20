import React from 'react';

const milestones = [
  { title: 'Phase 1: OMIX Foundation', details: 'Set up initial infrastructure. Build the Omix chatbot Terminal prototype. Early testing with medical and crypto integration.' },
  { title: 'Phase 2: Crypto Integration', details: 'Integrate blockchain. Add portfolio tools for traders. Deploy tokenomics and rewards system.' },
  { title: 'Phase 3: AI-Driven Assistance', details: 'Develop AI-powered interactions for health and trading. Enable personalized recommendations for users.' },
  { title: 'Phase 4: Global Rollout', details: 'Expand globally. Focus on multi-language support. Introduce advanced analytics and community tools.' },
  { title: 'Phase 5: Future Vision', details: 'Explore next-gen technologies, metaverse, Web3, and long-term growth partnerships.' },
];

const Milestones = () => (
  <div className="card-mil">
    <h2>OMIX Milestones</h2>
    <div className="milestone-timeline">
      {milestones.map((milestone, index) => (
        <div key={index} className="milestone">
          <strong>{milestone.title}</strong>
          <div className="milestone-details">{milestone.details}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Milestones;
