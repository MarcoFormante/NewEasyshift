import React,{createContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import './sass/index.css'
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import Alert from './components/Elements/Alert/Alert';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Alert/>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
