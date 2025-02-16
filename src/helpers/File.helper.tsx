import {
  File,
  FileJson,
  FileText,
  FileCode,
  FileImage,
  FileVideo,
  FileAudio,
  File as FileCss,
  File as FileHtml,
} from "lucide-react";

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "json":
      return <FileJson className="w-4 h-4 text-yellow-400" />;
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
      return <FileCode className="w-4 h-4 text-blue-400" />;
    case "css":
    case "scss":
    case "less":
      return <FileCss className="w-4 h-4 text-purple-400" />;
    case "html":
      return <FileHtml className="w-4 h-4 text-orange-400" />;
    case "md":
    case "txt":
      return <FileText className="w-4 h-4 text-gray-400" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return <FileImage className="w-4 h-4 text-green-400" />;
    case "mp4":
    case "webm":
    case "mov":
      return <FileVideo className="w-4 h-4 text-red-400" />;
    case "mp3":
    case "wav":
    case "ogg":
      return <FileAudio className="w-4 h-4 text-pink-400" />;
    default:
      return <File className="w-4 h-4 text-gray-400" />;
  }
};
