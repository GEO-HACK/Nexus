import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar />

      <div className="flex-1 flex justify-center  ">
        <div className="w-full max-w-8xl phx-4  ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
