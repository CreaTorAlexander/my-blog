import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// public keys we can easily commit them to GitHub
const firebaseConfig = {
  apiKey: "AIzaSyC0Hi3YwghkMek_cJeiA_BkDO0sL0xxo4U",
  authDomain: "my-blog-a5f48.firebaseapp.com",
  projectId: "my-blog-a5f48",
  storageBucket: "my-blog-a5f48.appspot.com",
  messagingSenderId: "537564827746",
  appId: "1:537564827746:web:796d5638558aa86807c13b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
