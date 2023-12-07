import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Watch from "./pages/Watch.jsx";
import Search from "./pages/Search.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  return (
    <div className="max-h-screen overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/watch/:id"
          element={
            <Layout>
              <Watch />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

const Layout = ({ children }) => {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const [sidebar, toggleSidebar] = useState(true);
  // console.log(sidebar);
  useEffect(() => {
    function handleResize() {
      setScreenSize(getScreenSize());
      // If the screen size is md or sm, hide the sidebar on resize
      console.log(screenSize);
      if (screenSize === "lg") {
        toggleSidebar(true);
      } else if (screenSize === "md") {
        toggleSidebar(false);
      }
    }

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  function getScreenSize() {
    const width = window.innerWidth;
    if (width >= 1100) {
      return "lg"; // Large screen
    } else if (width >= 924) {
      return "md";
    }
  }

  const handleToggleSidebar = () => {
    // If I wanted toggle the sidebar
    toggleSidebar(!sidebar);
  };

  return (
    <>
      <div>
        <div style={{ height: "7.5vh" }}>
          <Navbar handleToggleSidebar={handleToggleSidebar} />
        </div>
        <div className="flex" style={{ height: "92.5vh" }}>
          {sidebar ? <Sidebar show={sidebar} /> : ""}
          {children}
        </div>
      </div>
    </>
  );
};
