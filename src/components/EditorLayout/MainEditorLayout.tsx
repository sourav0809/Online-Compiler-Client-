import { SandpackProvider } from "@codesandbox/sandpack-react";
import { useState } from "react";
import EditorLayout from "./EditorLayout.tsx";
import PreviewLayout from "./PreviewLayout.tsx";
import { Panel, PanelGroup } from "react-resizable-panels";
import { ResizeHandleHorizontal } from "../common/Resizer.tsx";

const initialFiles: Record<string, string> = {
  "/App.jsx": `import React from 'react';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hello World</h1>
      <p>Start editing to see your changes!</p>
    </div>
  );
}`,
  "/styles.css": `body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 20px;
}`,
  "/index.jsx": `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);`,
};

const MainEditorLayout = () => {
  const [openTabs, setOpenTabs] = useState<string[]>(["/App.tsx"]);
  const [activeTab, setActiveTab] = useState<string>("/App.tsx");
  const [files, setFiles] = useState<Record<string, string>>(initialFiles);

  return (
    <SandpackProvider
      template="react"
      files={files}
      className="!w-full !h-full"
    >
      <div className="w-full h-screen">
        <PanelGroup direction="horizontal" className="w-full h-full">
          <Panel defaultSize={50} minSize={30}>
            <EditorLayout
              openTabs={openTabs}
              setOpenTabs={setOpenTabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              files={files}
              setFiles={setFiles}
            />
          </Panel>
          <div className="px-1 flex justify-center items-center !bg-[#111827]">
            <ResizeHandleHorizontal />
          </div>
          <Panel defaultSize={50} minSize={30}>
            <PreviewLayout />
          </Panel>
        </PanelGroup>
      </div>
    </SandpackProvider>
  );
};

export default MainEditorLayout;
