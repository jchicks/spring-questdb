import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {SlidingSidebar} from "./layouts/sidebar/SlidingSidebar";
import {StaticSidebar} from "./layouts/sidebar/StaticSidebar";
import {MainContentDark} from "./layouts/main/MainContent";

import "./assets/scss/style.scss";
import {StatisticsPageDark} from "./pages/statistics/StatisticsPageDark";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <>
      <div>
        <SlidingSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <StaticSidebar/>

        <MainContentDark setSidebarOpen={setSidebarOpen}>
          <Router>
            <Routes>
              <Route path="/statistics" element={<StatisticsPageDark />} />
              <Route path='*' element={<Navigate to='/statistics' />} />
            </Routes>
          </Router>
        </MainContentDark>
      </div>
    </>
  );
}

export default App;
