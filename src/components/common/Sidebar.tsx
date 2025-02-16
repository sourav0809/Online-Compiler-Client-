import { Code2, Files, Search, Settings2 } from "lucide-react";

const Sidebar = () => {
  console.log("Hii");
  return (
    <div className="w-12 flex-shrink-0 bg-[#111827] flex flex-col items-center py-4 border-r border-[#3b3a3a]">
      <button className="p-2 hover:bg-[#404040] rounded mb-4">
        <Files className="w-5 h-5 text-gray-400" />
      </button>
      <button className="p-2 hover:bg-[#404040] rounded mb-4">
        <Search className="w-5 h-5 text-gray-400" />
      </button>
      <button className="p-2 hover:bg-[#404040] rounded">
        <Code2 className="w-5 h-5 text-gray-400" />
      </button>
      <div className="mt-auto">
        <button className="p-2 hover:bg-[#404040] rounded">
          <Settings2 className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
