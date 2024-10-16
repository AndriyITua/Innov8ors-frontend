import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string().required("Required"),
});

export default signupSchema;
