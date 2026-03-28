
// import React from "react";
// import ReactDOM from "react-dom";

// function App() {
//   return (
//     <div>
//       <h1>React Training Demo</h1>
//       <p>This is rendered by React, not vanilla JS</p>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

