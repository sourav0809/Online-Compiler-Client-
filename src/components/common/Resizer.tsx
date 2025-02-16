import React from "react";
import { PanelResizeHandle } from "react-resizable-panels";
import { GripVertical, GripHorizontal } from "lucide-react";

export const ResizeHandleVertical: React.FC = () => (
  <PanelResizeHandle className="w-2 group flex items-center justify-center bg-[#1E1E1E] hover:bg-[#404040] transition-colors">
    <GripVertical className="w-4 h-4 text-white group-hover:text-white-400" />
  </PanelResizeHandle>
);

export const ResizeHandleHorizontal: React.FC = () => (
  <div className="flex justify-center items-center">
    <PanelResizeHandle className="h-1.5 group flex items-center justify-center bg-[#111827] transition-colors">
      <GripHorizontal className="w-4 h-4  group-hover:text-gray-400 text-white" />
    </PanelResizeHandle>
  </div>
);
