import React from "react";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div
      className="py-5 d-flex align-items-center"
      style={{ backgroundColor: "#ef7d49", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded mx-auto p-4">
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center">Please enter your new password.</p>
        <form>
          <CustomInput type={"password"} label="New Password" i_id="password" />
          <CustomInput
            type={"password"}
            label="Confirm Password"
            i_id="confirmpass"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
            style={{ backgroundColor: "#ef7d49" }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
