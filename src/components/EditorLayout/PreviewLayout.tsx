import React from "react";
import { SandpackPreview, SandpackConsole } from "@codesandbox/sandpack-react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { ResizeHandleHorizontal } from "../common/Resizer.tsx";

const PreviewLayout: React.FC = () => {
  return (
    <PanelGroup direction="vertical" className="bg-[#111827]">
      <Panel defaultSize={70} minSize={30}>
        <div className="h-full flex flex-col w-full">
          <div className="p-4 border-b border-[#1E1E1E] flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Preview
            </h2>
          </div>
          <div className="flex-1">
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
              className=" overflow-hidden h-full"
            />
          </div>
        </div>
      </Panel>
      <div className="py-2 bg-[#090d18]">
        <ResizeHandleHorizontal />
      </div>

      <Panel defaultSize={30} minSize={20}>
        <div className="h-full flex flex-col ">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white px-2 py-1 ">
            CONSOLE
          </h2>
          <div className="flex-1 overflow-y-auto">
            <SandpackConsole className="!bg-[#111827] h-full rounded-xl" />
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default PreviewLayout;
