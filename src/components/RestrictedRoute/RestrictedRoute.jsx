/**
 * - Якщо користувач увійшов у систему, відобразити <Navigate> для перенаправлення
 * - В іншому випадку відобразити компонент
 */

// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component, redirectTo }) {
  // Поки немає логіки логіну, вручну змінюйте на true/false
  const isLoggedIn = true;

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}
