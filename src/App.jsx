import React from "react";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import News from "./Pages/News";
import Settings from "./Pages/Settings";
import { UserProvider } from "./Config/UserContext";
import Bot from "./Pages/Bot";
import("tailwindcss").Config;

function App() {
  return (
    <UserProvider>
      <div>
        <Topbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/news" element={<News />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/bot" element={<Bot />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
