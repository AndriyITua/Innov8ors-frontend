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
        <div className={css.bottleImage}>
          <img
            src="../../assets/signupPageImages/bottle-signup.svg"
            alt="Water Bottle"
            width="280px"
            height="210px"
          />
        </div>
      </section>
    </>
  );
}
