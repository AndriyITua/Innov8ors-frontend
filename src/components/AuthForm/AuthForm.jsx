import { Field, Form, Formik, ErrorMessage } from "formik";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import * as Yup from "yup";

import { useId, useState } from "react";

import css from "./AuthForm.module.css";

import { NavLink } from "react-router-dom";
import { emailPattern } from "../../constants";

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailPattern, "Format example@mail.com")
    .required("Enter your email"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters!")
    .max(64, "Password should be max 64 characters!")
    .required("Enter your password"),
  repeat: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("Please confirm your password"),
});

export default function AuthForm() {
  const emailFieldId = useId();
  const passFieldId = useId();
  const repeatPassFieldId = useId();

  const initialValues = {
    email: "",
    password: "",
    repeat: "",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={signupSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched, values }) => (
          <Form className={css.formSignup}>
            <div className={css.inputContainer}>
              <label className={css.label} htmlFor={emailFieldId}>
                Enter your email
              </label>
              <Field
                className={`${css.inputEmail} ${
                  errors.email && touched.email
                    ? `${css.inputError} ${css.placeholderError}`
                    : values.email
                    ? css.inputFilled
                    : ""
                }`}
                type="email"
                name="email"
                id={emailFieldId}
                placeholder="E-mail"
              />
              <ErrorMessage
                className={css.error}
                name="email"
                component="span"
              />
            </div>
            <div className={css.inputContainer}>
              <label className={css.label} htmlFor={passFieldId}>
                Enter your password
              </label>
              <div
                className={`${css.eyeContainer} ${
                  errors.password && touched.password ? css.inputError : ""
                }`}
              >
                <Field
                  className={`${css.input} ${
                    errors.password && touched.password
                      ? `${css.inputError} ${css.placeholderError}`
                      : values.password
                      ? css.inputFilled
                      : ""
                  }`}
                  type={show ? "text" : "password"}
                  name="password"
                  id={passFieldId}
                  placeholder="Password"
                />
                <span onClick={handleClick} className={css.eye}>
                  {show ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
                </span>
              </div>
              <ErrorMessage
                className={css.error}
                name="password"
                component="span"
              />
            </div>
            <div className={css.inputContainer}>
              <label className={css.label} htmlFor={repeatPassFieldId}>
                Repeat password
              </label>
              <div
                className={`${css.eyeContainer} ${
                  errors.repeat && touched.repeat ? css.inputError : ""
                }`}
              >
                <Field
                  className={`${css.input} ${
                    errors.repeat && touched.repeat
                      ? `${css.input} ${css.placeholderError}`
                      : values.repeat
                      ? css.inputFilled
                      : ""
                  }`}
                  type={show ? "text" : "password"}
                  name="repeat"
                  id={repeatPassFieldId}
                  placeholder="Repeat password"
                />
                <span onClick={handleClick} className={css.eye}>
                  {show ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
                </span>
              </div>
              <ErrorMessage
                className={css.error}
                name="repeat"
                component="span"
              />
            </div>
            <button className={css.button} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <NavLink className={css.navlink} to="/signin">
        Sign in
      </NavLink>
    </>
  );
}
