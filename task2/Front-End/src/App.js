import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ReactLogin } from "./components/ReactLogin";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Products } from "./Pages/Products";
import { useSelector } from "react-redux";
import { RouteAuthGuard } from "./components/AuthGuard";

function App() {
  const state = useSelector((state) => state.product);
  console.log(state.products, "from app");
  console.log(state, "state");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<ReactLogin />} />
        <Route
          path="/products"
          element={
            <RouteAuthGuard
              component={<Products products={state.products} />}
              redirect="/"
            />
          }
        />
        {/* <Route path="/topics" element={<Topics />} /> */}
      </Routes>
    </>
  );
}
export default App;
