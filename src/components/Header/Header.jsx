import { useSelector } from "react-redux";
import { Logo } from "../Logo/Logo";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import Container from "../Container/Container";
import css from "./Header.module.css";

const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <header>
      <Container>
        <div className={css.header}>
          <Logo />
          {isLoggedIn ? <UserLogo /> : <UserAuth />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
