import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
type Props = {};

const Header = (props: Props) => {
  console.log("useLocation", useLocation());
  const location = useLocation().pathname;
  const navigate = useNavigate();

  let highlight = (path: string): boolean => {
    if (location === path) {
      return true;
    }
    return false;
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://s.zillowstatic.com/pfs/static/z-logo-default-visual-refresh.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          ></img>
        </div>
        <div>
          <ul className={"flex space-x-10 font-semibold "}>
            <li
              className={`cursor-pointer py-3 text-gray-400 border-b-4 ${
                highlight("/") ? `border-b-red-400` : `border-b-transparent`
              } `}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-gray-400 border-b-4 ${
                highlight("/offers")
                  ? `border-b-red-400`
                  : `border-b-transparent`
              } `}
              onClick={() => {
                navigate("/offers");
              }}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-gray-400 border-b-4 ${
                highlight("/sign-in")
                  ? `border-b-red-400`
                  : `border-b-transparent`
              } `}
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
