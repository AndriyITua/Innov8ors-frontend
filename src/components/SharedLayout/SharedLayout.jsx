import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import HeaderModal from "../HeaderModal/SearchBar/HeaderModal";

export default function SharedLayout() {
  return (
    <>
      <HeaderModal />
      <Suspense fallback={<p>Loading ...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}
