import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import 'bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

var root = createRoot(document.getElementById('root'));

fetch('user')
.then((res) => {
  if (res.status === 200) {
    root.render(<App/>);
  } else {
    root.render(<Login/>);
  }
});