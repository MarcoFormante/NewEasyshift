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


reportWebVitals();
