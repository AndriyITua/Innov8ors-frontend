import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";
import SharedLayout from "../SharedLayout/SharedLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors.js";
import { refreshUser } from "../../redux/auth/operationLogin.js";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage"));
const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage"));
const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (
      isLoggedIn &&
      (location.pathname === "/signin" || location.pathname === "/signup")
    ) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate, location.pathname]);

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user ...</p>
  ) : (
    <>
      <Suspense fallback={<p>Loading ....</p>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="welcome"
              element={
                <RestrictedRoute
                  component={<WelcomePage />}
                  redirectTo="/home"
                />
              }
            />
            <Route
              path="signup"
              element={
                <RestrictedRoute
                  component={<SignupPage />}
                  redirectTo="/home"
                />
              }
            />
            <Route
              path="signin"
              element={
                <RestrictedRoute
                  component={<SigninPage />}
                  redirectTo="/home"
                />
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute component={<HomePage />} redirectTo="/signin" />
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
