import React, { useState, useEffect } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import {
  FolderOpen,
  FolderClosed,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";
import { getFileIcon } from "../../helpers/File.helper.tsx";

interface FileNode {
  name: string;
  type: "file" | "directory";
  children?: FileNode[];
  expanded?: boolean;
  path?: string;
}

const PRIORITY_FOLDERS = ["src", "public"];

const sortFiles = (files: FileNode[]): FileNode[] => {
  return files
    .sort((a, b) => {
      // First, sort by priority folders
      const aPriority = PRIORITY_FOLDERS.indexOf(a.name);
      const bPriority = PRIORITY_FOLDERS.indexOf(b.name);

      if (aPriority !== -1 || bPriority !== -1) {
        if (aPriority === -1) return 1;
        if (bPriority === -1) return -1;
        return aPriority - bPriority;
      }

      // Then sort directories before files
      if (a.type !== b.type) {
        return a.type === "directory" ? -1 : 1;
      }

      // Finally sort by name
      return a.name.localeCompare(b.name);
    })
    .map((file) => {
      if (file.children) {
        return { ...file, children: sortFiles(file.children) };
      }
      return file;
    });
};

const FileTreeNode: React.FC<{
  node: FileNode;
  level: number;
  onToggle: (node: FileNode) => void;
  onSelect: (path: string) => void;
  selectedFile: string;
}> = ({ node, level, onToggle, onSelect, selectedFile }) => {
  const handleClick = () => {
    if (node.type === "directory") {
      onToggle(node);
    } else if (node.path) {
      onSelect(node.path);
    }
  };

  const isSelected = node.path === selectedFile;

  return (
    <div>
      <div
        className={clsx(
          "flex items-center py-1 px-2 hover:bg-[#37373D] rounded cursor-pointer",
          "transition-colors duration-150 ease-in-out",
          isSelected && "bg-[#37373D]"
        )}
        style={{ paddingLeft: `${level * 12}px` }}
        onClick={handleClick}
      >
        {node.type === "directory" && (
          <span className="mr-1">
            {node.expanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </span>
        )}
        <span className="mr-2">
          {node.type === "directory" ? (
            node.expanded ? (
              <FolderOpen className="w-4 h-4 text-yellow-400" />
            ) : (
              <FolderClosed className="w-4 h-4 text-yellow-400" />
            )
          ) : (
            getFileIcon(node.name)
          )}
        </span>
        <span className="text-sm text-gray-200">{node.name}</span>
      </div>
      {node.type === "directory" && node.expanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeNode
              key={`${child.name}-${index}`}
              node={child}
              level={level + 1}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FileExplorerProps {
  onSelect: (path: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ onSelect }) => {
  const { sandpack } = useSandpack();
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile] = useState<string>("/App.js");

  useEffect(() => {
    const sandpackFiles = Object.keys(sandpack.files);
    const fileTree: FileNode[] = [];

    sandpackFiles.forEach((path) => {
      const parts = path.split("/").filter(Boolean);
      let currentLevel = fileTree;

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;
        const existingNode = currentLevel.find((node) => node.name === part);

        if (!existingNode) {
          const newNode: FileNode = {
            name: part,
            type: isLast ? "file" : "directory",
            path: isLast ? path : undefined,
            expanded: true,
            children: isLast ? undefined : [],
          };
          currentLevel.push(newNode);
          if (!isLast && newNode.children) {
            currentLevel = newNode.children;
          }
        } else if (!isLast && existingNode.children) {
          currentLevel = existingNode.children;
        }
      });
    });

    setFiles(sortFiles(fileTree));
  }, [sandpack.files]);

  const toggleNode = (targetNode: FileNode) => {
    const updateNodes = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node === targetNode) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };

    setFiles(updateNodes(files));
  };

  const handleFileSelect = (path: string) => {
    onSelect(path);
    sandpack.openFile(path);
  };

  return (
    <div className="h-full bg-[#111827] text-white overflow-y-auto pl-.5">
      <div className="p-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-400 px-2">
          Explorer
        </h2>
        {files.map((file, index) => (
          <FileTreeNode
            key={`${file.name}-${index}`}
            node={file}
            level={0}
            onToggle={toggleNode}
            onSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
