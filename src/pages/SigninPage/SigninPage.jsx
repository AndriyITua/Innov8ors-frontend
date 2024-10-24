import { useSelector } from "react-redux";
import SignInAuthForm from "../../components/SignInAuthForm/SignInAuthForm.jsx";

import Loader from "../../components/Loader/Loader.jsx";

import { selectLoading } from "../../redux/auth/selectors.js";

import css from "./SigninPage.module.css";

export default function SigninPage() {
  const isLoading = useSelector(selectLoading);

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={css.section}>
          <div className={css.container}>
            <SignInAuthForm />
          </div>
        </section>
      )}
    </main>
  );
}
