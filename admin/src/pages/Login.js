import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user === null || isSuccess) {
      navigate("admin");
    }
  }, [user, isSuccess]);

  return (
    <div
      className="py-5 d-flex align-items-center"
      style={{ backgroundColor: "#ef7d49", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login your account to continue.</p>
        <form method="POST" onSubmit={formik.handleSubmit}>
          <CustomInput
            value={formik.values.email}
            type={"email"}
            onChange={formik.handleChange}
            label="Email Address"
            i_id="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <CustomInput
            value={formik.values.password}
            onChange={formik.handleChange}
            type={"password"}
            label="Password"
            i_id="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <div className="m-3 text-end">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
            style={{ backgroundColor: "#ef7d49" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
