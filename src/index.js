import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import Store from "./store";
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createGlobalStyle } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";


const { persistor, store } = Store();

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #fffcdd;
    transition: all 0.5s ease-in;
  }
`;

ReactDOM.render(
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
    <GlobalStyle />
     <App />
    </PersistGate>  
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
