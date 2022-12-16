import React from 'react';
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import AuthProvider from "./contexts/provider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <AuthProvider>
          <App/>
      </AuthProvider>
);
