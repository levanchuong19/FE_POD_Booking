import { Outlet, useLocation } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { useEffect } from "react";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "90px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
