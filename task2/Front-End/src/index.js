import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { Provider as ReactReduxProvider } from "react-redux";
import { store } from "./state/store";

ReactDOM.render(
  <GoogleOAuthProvider clientId="354104421089-ib2f9judkfsb108d699ss70e2tc6l0rc.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <ReactReduxProvider store={store}>
          <App />
        </ReactReduxProvider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
