import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./helpers/store";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {App} from "./components/App";
import './styles/styles.css'
import {HomePageContainer} from "./components/Home/HomePage";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
          <Switch>
              <Route exact path="/" component={HomePageContainer} />
              <App/>
          </Switch>
      </Router>
  </Provider>,
  rootElement
);
