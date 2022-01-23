import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export const Registration = ({ intl }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your details to create your account
        </p>
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
      >
        {/* begin: Fullname */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Full name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="fullname"
          />
        </div>
        {/* end: Fullname */}

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 `}
            name="email"
          />
        </div>
        {/* end: Email */}

        {/* begin: Username */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="User name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 `}
            name="username"
          />
        </div>
        {/* end: Username */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="password"
          />
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="changepassword"
          />
        </div>
        {/* end: Confirm Password */}

        {/* begin: Terms and Conditions */}
        <div className="form-group">
          <label className="checkbox">
            <input type="checkbox" name="acceptTerms" className="m-1" />
            <Link
              to="/terms"
              target="_blank"
              className="mr-1"
              rel="noopener noreferrer"
            >
              I agree the Terms & Conditions
            </Link>
            <span />
          </label>
        </div>
        {/* end: Terms and Conditions */}
        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
            onClick={handleRegister}
          >
            <span>Submit</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
