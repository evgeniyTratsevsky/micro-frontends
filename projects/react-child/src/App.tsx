import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: '⚛️',
      title: 'React 18',
      description: 'Built with the latest React features including hooks and concurrent rendering'
    },
    {
      icon: '🔌',
      title: 'Module Federation',
      description: 'Seamlessly integrated into the Angular host via Webpack Module Federation'
    },
    {
      icon: '🎨',
      title: 'Modern UI',
      description: 'Beautiful, responsive design with smooth animations and transitions'
    },
    {
      icon: '⚡',
      title: 'High Performance',
      description: 'Optimized bundle size with code splitting and lazy loading'
    }
  ];

  const stats = [
    { label: 'Components', value: '24', color: '#61dafb' },
    { label: 'Bundle Size', value: '45KB', color: '#764ba2' },
    { label: 'Load Time', value: '1.2s', color: '#667eea' },
    { label: 'Performance', value: '98/100', color: '#42b883' }
  ];

  return (
    <div className="react-child-container">
      <div className="react-header">
        <h2>React Child Application</h2>
        <div className="badge">Module Federation</div>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === 'overview' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'features' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button 
          className={activeTab === 'stats' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </div>

      <div className="content">
        {activeTab === 'overview' && (
          <div className="overview">
            <h3>Welcome to React Micro-Frontend</h3>
            <p className="subtitle">
              This is a React application integrated into the Angular host using Module Federation.
              It demonstrates how different frameworks can work together seamlessly.
            </p>
            
            <div className="info-box">
              <h4>🚀 Key Highlights</h4>
              <ul>
                <li>Independent React application running within Angular host</li>
                <li>Shared runtime with optimized bundle sizes</li>
                <li>Real-time state management with React hooks</li>
                <li>TypeScript support for type safety</li>
                <li>Hot module replacement for fast development</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-container">
            <h3>Performance Metrics</h3>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
                  <div className="stat-value" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="tech-stack">
              <h4>Technology Stack</h4>
              <div className="tech-badges">
                <span className="tech-badge">React 18</span>
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">Webpack 5</span>
                <span className="tech-badge">Module Federation</span>
                <span className="tech-badge">CSS3</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

