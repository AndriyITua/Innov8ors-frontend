import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format example@mail.com")
    .required("Enter your email"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters!")
    .required("Enter your password"),
  repeat: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("Please confirm your password"),
});

export default signupSchema;
