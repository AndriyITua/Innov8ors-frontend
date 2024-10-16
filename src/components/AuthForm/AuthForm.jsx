import { Field, Form, Formik, ErrorMessage } from "formik";

import { useId } from "react";

import css from "./AuthForm.module.css";
import signupSchema from "../../validation/signupSchema";

export default function AuthForm() {
  const emailFieldId = useId();
  const passFieldId = useId();
  const repeatPassFieldId = useId();

  const initialValues = {
    email: "E-mail",
    password: "Password",
    repeat: "Repeat password",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={signupSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor={emailFieldId}>
            Enter your email
          </label>
          <Field
            className={css.input}
            type="email"
            name="email"
            id={emailFieldId}
          />
          <ErrorMessage className={css.error} name="email" component="span" />

          <label className={css.label} htmlFor={passFieldId}>
            Enter your password
          </label>
          <Field
            className={css.input}
            type="text"
            name="password"
            id={passFieldId}
          />
          <ErrorMessage
            className={css.error}
            name="password"
            component="span"
          />

          <label className={css.label} htmlFor={repeatPassFieldId}>
            Repeat password
          </label>
          <Field
            className={css.input}
            type="text"
            name="repeat"
            id={repeatPassFieldId}
          />
          <ErrorMessage className={css.error} name="repeat" component="span" />

          <button className={css.button} type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>
      {/* <NavLink>Sign in</NavLink> */}
    </>
  );
}
