import { Routes, Route, BrowserRouter } from "react-router-dom";
import Document from "./pages/Document/Document";
import "./App.css";
import { useState } from "react";

// main part start
import SideBar from "./components/Sidebar/Sidebar";
import sidebarStyles from "./components/Sidebar/Sidebar.module.css";
// main part end

import { v4 as uuidV4 } from "uuid";

const user = {
  id: uuidV4(),
  name: "User",
  avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${uuidV4()}`,
};

function App() {
  function showSidebar() {
    const element = document.getElementById("mySidebar");
    element.classList.remove(sidebarStyles.hideSidebar);
    const mask = document.getElementById("myMask");
    mask.classList.add(sidebarStyles.modalMask);
  }
  return (
    <>
      <span>
        <button onClick={showSidebar}>Show Communications</button>
      </span>
      <BrowserRouter>
        <Routes>
          <Route
            path="/document/:fileId"
            element={<Document user={uuidV4()} />}
          />
        </Routes>
      </BrowserRouter>
      <SideBar user={user} />
    </>
  );
}

export default App;
