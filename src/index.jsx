import { server }  from './mocks/server';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

function prepare() {
  return server.start({
    quiet: true,  
  })
}

prepare().then(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
})
