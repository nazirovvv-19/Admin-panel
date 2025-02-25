import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainSection from "./components/MainSetion";
import LoginPage from "./pages/LoginPage";
import useMyStore from "./store/my-store";
function App() {
  const [collapsed, setCollapsed] = useState(false);
  // const [login ,setLogin]=useState(false)
  const auth = useMyStore();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="h-[100vh] overflow-y-hidden">
      {auth.users ? (
        <>
          <Navbar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          <div className="flex h-full">
            <Sidebar collapsed={collapsed} />
            <MainSection />
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
