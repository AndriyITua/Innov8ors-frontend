import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";
import SharedLayout from "../SharedLayout/SharedLayout.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage"));
const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage"));
const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));

export default function App() {
  return (
    <>
      <Suspense fallback={<p>Loading ....</p>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
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
