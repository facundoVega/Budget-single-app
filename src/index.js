import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import { BudgetsProvider } from './Contexts/BudgetsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BudgetsProvider>
    <App  />
  </ BudgetsProvider>
);


