import { useState } from "react";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { emailPattern } from "../../constants/index.js";

import { HiOutlineEyeSlash } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi2";

import css from "./SignInAuthForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operationLogin.js";

export default function SignInAuthForm() {
  const [shouldPasswordBeShown, setShouldPasswordBeShown] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailPattern, "Format example@mail.com")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters!")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signInSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form className={css.form}>
          <h2 className={css.title}>Sign In</h2>
          <div className={css.inputWrapper}>
            <label className={css.label} htmlFor="email">
              Enter your email
            </label>

            <Field
              className={`${css.input} ${errors.email ? css.inputError : ""}`}
              id="email"
              name="email"
              placeholder="E-mail"
            />
            {errors.email && <span className={css.error}>{errors.email}</span>}
          </div>

          <div className={css.inputWrapper}>
            <label className={css.label} htmlFor="password">
              Enter your password
            </label>

            <div className={css.passwordWrapper}>
              <Field
                className={`${css.input} ${
                  errors.password ? css.inputError : ""
                }`}
                id="password"
                name="password"
                placeholder="Password"
                type={shouldPasswordBeShown ? "text" : "password"}
              />
              {shouldPasswordBeShown ? (
                <HiOutlineEye
                  size={16}
                  className={css.icon}
                  onClick={() => setShouldPasswordBeShown(prev => !prev)}
                />
              ) : (
                <HiOutlineEyeSlash
                  size={16}
                  className={css.icon}
                  onClick={() => setShouldPasswordBeShown(prev => !prev)}
                />
              )}
            </div>
            {errors.password && (
              <span className={css.error}>{errors.password}</span>
            )}
          </div>

          <button type="submit" className={css.submitBtn}>
            Sign In
          </button>

          <Link to="/signup" className={css.link}>
            Sign up
          </Link>
        </Form>
      )}
    </Formik>
  );
}
