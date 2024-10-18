import { Field, Form, Formik, ErrorMessage } from "formik";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeSlash } from "react-icons/hi2";

import { useId, useState } from "react";

import css from "./AuthForm.module.css";
import signupSchema from "../../validation/signupSchema";
import { NavLink } from "react-router-dom";

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
      >
        <Form className={css.form}>
          <div className={css.inputContainer}>
            <label className={css.label} htmlFor={emailFieldId}>
              Enter your email
            </label>
            <Field
              className={css.inputEmail}
              type="email"
              name="email"
              id={emailFieldId}
              placeholder="E-mail"
            />
            <ErrorMessage className={css.error} name="email" component="span" />
          </div>
          <div className={css.inputContainer}>
            <label className={css.label} htmlFor={passFieldId}>
              Enter your password
            </label>
            <div className={css.eyeContainer}>
              <Field
                className={css.input}
                type={show ? "text" : "password"}
                name="password"
                id={passFieldId}
                placeholder="Password"
              ></Field>
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
            <div className={css.eyeContainer}>
              <Field
                className={css.input}
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
      </Formik>
      <NavLink className={css.navlink} to="/signin">
        Sign in
      </NavLink>
    </>
  );
}
