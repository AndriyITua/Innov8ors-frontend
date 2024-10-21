import AuthForm from "../../components/AuthForm/AuthForm";
// import Container from "../../components/Container/Container";
import css from "./SignupPage.module.css";

export default function SignupPage() {
  return (
    <>
      <section className={css.signupSection}>
        <div className={css.container}>
          <h3 className={css.formText}>Sign Up</h3>
          <AuthForm />
        </div>
      </section>
    </>
  );
}
