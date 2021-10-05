import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications'

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <ToastProvider><App /></ToastProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
