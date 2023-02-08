import React, { useEffect, useRef, useState } from "react";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export const ReactLogin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const signUp = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          // setProfile(res.data);
          const {
            email,
            picture,
            family_name,
            given_name,
            name,
            verified_email,
          } = res.data;
          axios
            .post("http://localhost:5000/add-user", {
              email,
              picture,
              family_name,
              given_name,
              name,
              verified_email,
              password: family_name,
            })
            .then((response) => {
              alert(
                `Signup is done !!!! \n Please remember credential listed below. \n email : ${email} \n password : ${family_name}`
              );
            })
            .catch((err) => {
              alert(err.response.data);
            });
        })
        .catch((err) => alert(err.response.data.error.message));
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const login = () => {
    axios
      .post("http://localhost:5000/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/products");
      })
      .catch((err) => {
        console.log(err, "err");
        alert(err.response.data);
      });
  };

  return (
    <>
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" style={{ borderRadius: "1em" }}>
                <div class="card-body p-5">
                  <h3 class="mb-5 text-center">Sign in</h3>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="typeEmailX-2">
                      Email
                    </label>
                    <input
                      type="email"
                      ref={emailRef}
                      id="typeEmailX-2"
                      class="form-control form-control-lg"
                      placeholder="Please enter email here"
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="typePasswordX-2">
                      Password
                    </label>
                    <input
                      type="password"
                      ref={passwordRef}
                      id="typePasswordX-2"
                      class="form-control form-control-lg"
                      placeholder="Please enter Password here"
                    />
                  </div>

                  <div className="">
                    {" "}
                    <button
                      onClick={login}
                      class="btn btn-primary form-control form-control-lg "
                      type="submit"
                    >
                      Login
                    </button>
                  </div>

                  <button
                    class="btn btn-lg btn-block btn-secondary mt-5 w-100"
                    style={{ backgroundOrigin: "#dd4b39" }}
                    type="submit"
                    onClick={signUp}
                  >
                    <i class="fab fa-google me-2"></i> Sign Up with google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
