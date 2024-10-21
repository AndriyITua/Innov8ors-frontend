import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function SharedLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading ...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}
