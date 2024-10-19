import SignInAuthForm from "../../components/SignInAuthForm/SignInAuthForm.jsx";

import css from "./SigninPage.module.css";

export default function SigninPage() {
  return (
    <main>
      <section className={css.section}>
        <div className={css.container}>
          <h2 className={css.title}>Sign In</h2>
          <SignInAuthForm />
        </div>
      </section>
    </main>
  );
}
