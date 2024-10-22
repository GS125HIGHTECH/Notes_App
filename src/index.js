import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Notes from './Notes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Notes />
  </React.StrictMode>
);
