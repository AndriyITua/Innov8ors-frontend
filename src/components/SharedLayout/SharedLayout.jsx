import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import TemporaryHeader from "../HeaderBar/TemporaryHeader/TemporaryHeader";

export default function SharedLayout() {
  return (
    <>
      <TemporaryHeader />
      <Suspense fallback={<p>Loading ...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}
