import { Suspense } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
export default function SharedLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading ...</p>}>
        <Outlet />
      </Suspense>

      <Toaster>
        {t => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    <IoCloseCircleSharp size={16} />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  );
}
