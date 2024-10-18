import SignInAuthForm from "../../components/SignInAuthForm/SignInAuthForm.jsx";

import Container from "../../components/Container/Container.jsx";

import css from "./SigninPage.module.css";

export default function SigninPage() {
  return (
    <main>
      <section className={css.section}>
        <Container>
          <h2 className={css.title}>Sign In</h2>
          <SignInAuthForm />
        </Container>
      </section>
    </main>
  );
}
