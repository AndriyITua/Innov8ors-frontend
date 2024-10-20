import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import TemporaryHeader from "../../components/HeaderBar/TemporaryHeader/TemporaryHeader"


export default function SharedLayout() {
  return (
    <>
      <Header />
      <TemporaryHeader />
      <Suspense fallback={<p>Loading ...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}
