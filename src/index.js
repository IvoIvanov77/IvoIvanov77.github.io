import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./helpers/store";
import {BrowserRouter as Router} from "react-router-dom";
import {App} from "./components/App";
import './styles/styles.css'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
      <Router>
          <App/>
      </Router>
  </Provider>,
  rootElement
);
