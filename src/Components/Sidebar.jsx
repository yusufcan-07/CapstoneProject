import {
  Home,
  Newspaper,
  Wallet,
  Settings,
  EyeOff,
  MoveUp,
} from "lucide-react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [hidden, setHidden] = useState(false);
  const toggleHidden = () => {
    setHidden(!hidden);
  };

  return (
    <div className="bg-[#f5f7f9] w-80 h-full fixed top-0 left-0 shadow-md p-4 space-y-4">
      <div className="text-lg p-4">Stock Management App</div>
      <div className="rounded-lg container-height w-60 bg-[#1C1C1C] mx-4 p-4 text-white flex items-center space-x-4">
        <div>
          <div>Total invesment</div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">{hidden ? "****" : "$5380.90"}</span>
            <button onClick={toggleHidden}>
              <EyeOff size={14} />
            </button>
          </div>
        </div>
        <div className="flex items-center text-[#6AB686] text-semibold">
          {hidden ? (
            ""
          ) : (
            <div className="flex items-center">
              +18,10%
              <MoveUp size={14} />
            </div>
          )}
        </div>
      </div>
      <div>
        <CustomLink to={"/"} icon={<Home size={24} />}>
          Home
        </CustomLink>
        <CustomLink to={"/portfolio"} icon={<Wallet size={24} />}>
          Porfolio
        </CustomLink>
        <CustomLink to={"/news"} icon={<Newspaper size={24} />}>
          KAP News
        </CustomLink>
        <div className="sidebar-height" />
        <hr />
        <CustomLink to={"/settings"} icon={<Settings size={24} />}>
          Settings
        </CustomLink>
      </div>
    </div>
  );

  function CustomLink({ to, icon, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname });
    return (
      <Link to={to} {...props}>
        <SidebarItem icon={icon} text={children} active={isActive} />
      </Link>
    );
  }
}

export function SidebarItem({ icon, text, active }) {
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-bold rounded-md cursor-pointer transition-colors 
      ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span className="w-52 ml-3">{text}</span>
    </li>
  );
}
