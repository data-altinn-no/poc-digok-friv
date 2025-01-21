import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The root element was not found in the DOM.');
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
