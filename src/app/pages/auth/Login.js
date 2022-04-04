import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { login, me } from "./authSlice";
import { showErrorDialog } from "../../utility";

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const getMe = async () => {
    try {
      setLoading(true);
      const response = await dispatch(me());
      const res = response.payload;
      if (res.status === 200) {
        history.push("/dashboard");
      } else {
        showErrorDialog(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await dispatch(login(userInput));
      const res = response.payload;
      if (res.status === 200) {
        getMe();
      } else {
        showErrorDialog(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <div className="form fv-plugins-bootstrap fv-plugins-framework">
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="email"
            value={userInput.userName}
            onChange={(e) => {
              setUserInput({ ...userInput, userName: e.target.value });
            }}
          />
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="password"
            value={userInput.password}
            onChange={(e) => {
              setUserInput({ ...userInput, password: e.target.value });
            }}
          />
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={loading}
            onClick={handleLogin}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In test</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </div>
      {/*end::Form*/}
    </div>
  );
};
