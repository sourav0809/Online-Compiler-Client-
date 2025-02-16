import React from "react";
import Sidebar from "./components/common/Sidebar";

import MainEditorLayout from "./components/EditorLayout/MainEditorLayout.tsx";

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#1E1E1E] text-gray-300 flex">
      <Sidebar />
      <MainEditorLayout />
    </div>
  );
};

export default App;
