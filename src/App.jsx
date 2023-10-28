import React from "react";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import News from "./Pages/News";
import Settings from "./Pages/Settings";

import("tailwindcss").Config;

function App() {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/news" element={<News />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
