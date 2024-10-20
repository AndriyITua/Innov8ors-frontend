/**
 * - Якщо користувач увійшов у систему, відобразити компонент
 * - В іншому випадку відобразити <Navigate> для перенаправлення
 */

// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component, redirectTo }) {
  // Поки немає логіки логіну, вручну змінюйте на true/false
  const isLoggedIn = true;

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
