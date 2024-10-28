import AuthForm from "../../components/AuthForm/AuthForm";
// import Container from "../../components/Container/Container";
import css from "./SignupPage.module.css";
import { selectLoading } from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";

export default function SignupPage() {
  const isLoading = useSelector(selectLoading);

  return (
    <>
      <section className={css.signupSection}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={css.container}>
            <h3 className={css.formText}>Sign Up</h3>
            <AuthForm />
          </div>
        )}
      </section>
    </>
  );
}
