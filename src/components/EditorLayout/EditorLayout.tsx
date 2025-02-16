import React from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import FileExplorer from "../FileExplorer/FileExplorer";
import EditorTabs from "../Editor/EditorTabs";
import MonacoEditor from "../Editor/MonacoEditor";
import { ResizeHandleVertical } from "../common/Resizer.tsx";

interface EditorLayoutProps {
  openTabs: string[];
  setOpenTabs: React.Dispatch<React.SetStateAction<string[]>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  files: Record<string, string>;
  setFiles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  openTabs,
  setOpenTabs,
  activeTab,
  setActiveTab,
  files,
  setFiles,
}) => {
  const handleFileSelect = (path: string) => {
    if (!openTabs.includes(path)) {
      setOpenTabs([...openTabs, path]);
    }
    setActiveTab(path);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFiles((prev) => ({
        ...prev,
        [activeTab]: value,
      }));
    }
  };

  return (
    <PanelGroup direction="horizontal" className="w-full h-full">
      <Panel defaultSize={70} minSize={30}>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={30} minSize={25} maxSize={50}>
            <div className="h-full border-r border-[#1E1E1E] bg-[#252526]">
              <FileExplorer onSelect={handleFileSelect} />
            </div>
          </Panel>
          <ResizeHandleVertical />
          <Panel minSize={30}>
            <div className="h-full w-full flex flex-col">
              <EditorTabs
                tabs={openTabs.map((path) => ({
                  path,
                  active: path === activeTab,
                }))}
                onTabClick={setActiveTab}
                onTabClose={(path) =>
                  setOpenTabs(openTabs.filter((t) => t !== path))
                }
              />
              <div className="flex-1">
                <MonacoEditor
                  path={activeTab}
                  value={files[activeTab]}
                  onChange={handleEditorChange}
                />
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
};

export default EditorLayout;
