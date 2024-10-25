import Container from "../../components/Container/Container";
import bottleMobile from "../../assets/notFoundPage/bottleMobile.png";
import bottleTablet from "../../assets/notFoundPage/bottleTablet.png";
import css from "./NotFoundPage.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <Container>
      <div className={css.notFoundContent}>
        <h1 className={css.notFoundTitle}>404</h1>
        <h2>Oops! We can’t find this page.</h2>
        <p className={css.notFoundText}>
          Maybe someone drank all the water and left the page empty. 😅
        </p>

        <button onClick={handleClick} type="button" className={css.goHomeBtn}>
          Go Home
        </button>

        <picture>
          <source srcSet={bottleTablet} media="(min-width: 1440px)" />
          <source srcSet={bottleTablet} media="(min-width: 768px)" />
          <img src={bottleMobile} alt="Bottle" />
        </picture>
      </div>
    </Container>
  );
}
