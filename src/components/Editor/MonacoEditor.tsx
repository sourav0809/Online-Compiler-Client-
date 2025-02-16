import React from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

interface MonacoEditorProps {
  path: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  path,
  value,
  onChange,
}) => {
  const getLanguage = (path: string) => {
    const ext = path.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "js":
      case "jsx":
        return "javascript";
      case "ts":
      case "tsx":
        return "typescript";
      case "css":
        return "css";
      case "html":
        return "html";
      case "json":
        return "json";
      default:
        return "plaintext";
    }
  };

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("vs-dark-custom", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#1E1E1E",
          "editor.foreground": "#D4D4D4",
          "editor.lineHighlightBackground": "#2D2D2D",
          "editorCursor.foreground": "#AEAFAD",
          "editor.selectionBackground": "#264F78",
          "editor.inactiveSelectionBackground": "#3A3D41",
          "editorIndentGuide.background": "#404040",
          "editorIndentGuide.activeBackground": "#707070",
          "editor.selectionHighlightBorder": "#0078D4",
        },
      });

      monaco.editor.setTheme("vs-dark-custom");
    }
  }, [monaco]);

  return (
    <Editor
      height="100%"
      defaultValue={value}
      theme="vs-dark-custom"
      path={path}
      defaultLanguage={getLanguage(path)}
      value={value}
      onChange={onChange}
      beforeMount={(monaco) => {
        monaco.editor.defineTheme("vs-dark-custom", {
          base: "vs-dark",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": "#1E1E1E",
            "editor.foreground": "#D4D4D4",
            "editor.lineHighlightBackground": "#2D2D2D",
            "editorCursor.foreground": "#AEAFAD",
            "editor.selectionBackground": "#264F78",
            "editor.inactiveSelectionBackground": "#3A3D41",
            "editorIndentGuide.background": "#404040",
            "editorIndentGuide.activeBackground": "#707070",
            "editor.selectionHighlightBorder": "#0078D4",
          },
        });

        monaco.editor.setTheme("vs-dark-custom");
      }}
      options={{
        fontSize: 14,
        fontFamily: '"Fira Code", "Fira Mono", monospace',
        fontLigatures: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
        lineNumbers: "on",
        glyphMargin: true,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        quickSuggestionsDelay: 10,
        parameterHints: { enabled: true },
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        autoIndent: "full",
        formatOnPaste: true,
        formatOnType: true,
        renderWhitespace: "selection",
        colorDecorators: true,
        bracketPairColorization: {
          enabled: true,
        },
      }}
    />
  );
};

export default MonacoEditor;
