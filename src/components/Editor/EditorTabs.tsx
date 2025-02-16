import React from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { getFileIcon } from "../../helpers/File.helper.tsx";

interface Tab {
  path: string;
  active: boolean;
}

interface EditorTabsProps {
  tabs: Tab[];
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  tabs,
  onTabClick,
  onTabClose,
}) => {
  const getFileName = (path: string) => path.split("/").pop() || "";

  return (
    <div className="flex h-9 bg-[#252526] border-b border-[#1E1E1E] select-none overflow-x-auto">
      <div className="flex-1 flex pb-.5">
        {tabs.map((tab) => {
          const fileName = getFileName(tab.path);
          return (
            <div
              key={tab.path}
              className={clsx(
                "group relative h-full flex items-center px-3 py-2 border-r border-[#1E1E1E]",
                "hover:bg-[#2D2D2D] cursor-pointer transition-colors duration-150",
                tab.active && "bg-[#1E1E1E]",
                !tab.active && "hover:bg-[#2D2D2D]"
              )}
              onClick={() => onTabClick(tab.path)}
            >
              <div className="flex items-center space-x-2 py-[5px]">
                <span className="flex-shrink-0">{getFileIcon(fileName)}</span>
                <span
                  className={clsx(
                    "text-sm whitespace-nowrap",
                    tab.active ? "text-white" : "text-gray-400"
                  )}
                >
                  {fileName}
                </span>
                <button
                  className={clsx(
                    "p-0.5 rounded hover:bg-[#404040] opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-150"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.path);
                  }}
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>
              {/* Active Tab Indicator */}
              {tab.active && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#007ACC]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditorTabs;
