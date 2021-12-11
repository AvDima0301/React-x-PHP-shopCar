import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from './store';
import { Provider } from "react-redux";
import { AuthUser } from "./components/auth/login/actions";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbC5sYXJhdmVsLnNwdTkxMS5jb21cL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MzkyMjE1NTYsImV4cCI6MTYzOTIyNTE1NiwibmJmIjoxNjM5MjIxNTU2LCJqdGkiOiIxYXZ4UWNYQzVuYjdmaElyIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJ0aW1AZ21haWwuY29tIiwiaW1hZ2UiOm51bGx9._KuEGoovsLeuNvSjGxWN6crh9-yYc-fZyj98QX8RcWU";
AuthUser(token, store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




