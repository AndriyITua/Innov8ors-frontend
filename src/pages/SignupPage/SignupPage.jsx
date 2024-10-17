import AuthForm from "../../components/AuthForm/AuthForm";
import Container from "../../components/Container/Container";
import css from "./SignupPage.module.css";

export default function SignupPage() {
  return (
    <>
      <p>Signup Page</p>
      <section className={css.signupSection}>
        <Container>
          <h3 className={css.formText}>Sign Up</h3>
          <AuthForm />
        </Container>
      </section>
    </>
  );
}
