import React from "react";
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div
      className="py-5 d-flex align-items-center"
      style={{ backgroundColor: "#ef7d49", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded mx-auto p-4">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">
          Please enter your register email to get reset password mail.
        </p>
        <form>
          <CustomInput type={"email"} label="Email Address" i_id="email" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
            style={{ backgroundColor: "#ef7d49" }}
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
