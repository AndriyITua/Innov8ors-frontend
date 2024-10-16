import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage"));
const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage"));
const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));

export default function App() {
  return (
    <>
      {/* <Header /> */}
      <Suspense fallback={<p></p>}>
        <Routes>
          <Route
            path="/"
            element={
              <RestrictedRoute component={<WelcomePage />} redirectTo="/home" />
            }
          />
          <Route
            path="/welcome"
            element={
              <RestrictedRoute component={<WelcomePage />} redirectTo="/home" />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute component={<SignupPage />} redirectTo="/home" />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute component={<SigninPage />} redirectTo="/home" />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute component={<HomePage />} redirectTo="/signin" />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
