import { useState } from "react";
import "./App.css";
import Editor from "./components/Editor";

function App() {
  return (
    <>
      <div className="w-full h-64 flex flex-col gap-4">
        <h1 className="text-lg font-medium">Custom Notion Editor</h1>
        <div className="w-full flex-grow relative">
          <Editor />
        </div>
        <span className="text-sm text-gray-500">
          Note: Use @ for callback feature
        </span>
      </div>
    </>
  );
}

export default App;
