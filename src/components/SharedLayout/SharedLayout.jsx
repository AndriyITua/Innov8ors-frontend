import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <>
      {/* <Header/> */}
      <Suspense fallback={<p>Loading ...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}
