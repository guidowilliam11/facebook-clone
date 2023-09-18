import { Link, useNavigate } from "react-router-dom";
import { CurrentUserDetail } from "../../Context/CurrentUserContext";
import { FaFacebook, FaMoon, FaUserCircle } from "react-icons/fa";
import { AiFillHome, AiOutlineHome, AiTwotoneSetting } from "react-icons/ai";
import { BiSolidHelpCircle } from "react-icons/bi";
import { RiFeedbackFill } from "react-icons/ri";
import { BsGrid3X3GapFill, BsMessenger } from "react-icons/bs";
import {
  IoPeopleSharp,
  IoStorefrontSharp,
  IoStorefrontOutline,
  IoPeopleOutline,
  IoNotifications,
  IoLogOut,
} from "react-icons/io5";
import { HiUserGroup, HiOutlineUserGroup } from "react-icons/hi";
import { useEffect, useState } from "react";
import CircleButton from "../CircleButton";
import IconLabel from "../IconLabel";
import Footer from "./Footer";
import { EncryptStorage } from "encrypt-storage";
import { useTheme } from "../../Context/ThemeContext";

export const encryptStorage = new EncryptStorage("GuidoWilliam", {
  encAlgorithm: "Rabbit",
});

const Header = () => {
  const currentUserValue = CurrentUserDetail();
  const navigate = useNavigate();
  const [page, setPage] = useState(window.location.pathname);
  const [detailDrop, setDetailDrop] = useState(false);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    // Update the page state whenever the URL path changes
    const handleLocationChange = () => {
      setPage(window.location.pathname);
      console.log(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return (
    <>
      <header className="w-screen bg-white flex justify-between items-center px-2 shadow h-[55px] fixed">
        <div className="flex w-1/4 h-10 gap-3">
          <FaFacebook className="text-fblue w-10 h-10" />
          <div className="relative h-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full h-full p-4 pl-10 text-sm text-gray-900 font-medium rounded-full bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Facebook"
            />
          </div>
        </div>
        <div className="flex justify-center items-center h-full w-1/2">
          <Link
            className="flex justify-center items-center h-full w-[15%] border-b-2 border-transparent hover:border-fblue"
            to={"/"}
          >
            {page === "/" ? (
              <AiFillHome className="text-fblue w-6 h-6" />
            ) : (
              <AiOutlineHome className="text-gray-400 w-6 h-6" />
            )}
          </Link>

          <Link
            className="flex justify-center items-center h-full w-[15%] border-b-2 border-transparent hover:border-fblue"
            to={"/friend"}
          >
            {page === "/friend" ? (
              <IoPeopleSharp className=" text-fblue w-6 h-6" />
            ) : (
              <IoPeopleOutline className="text-gray-400 w-6 h-6" />
            )}
          </Link>

          <Link
            className="flex justify-center items-center h-full w-[15%] border-b-2 border-transparent hover:border-fblue"
            to={"/marketplace"}
          >
            {page === "/marketplace" ? (
              <IoStorefrontSharp className=" text-fblue w-6 h-6" />
            ) : (
              <IoStorefrontOutline className="text-gray-400 w-6 h-6" />
            )}
          </Link>

          <Link
            className="flex justify-center items-center h-full w-[15%] border-b-2 border-transparent hover:border-fblue"
            to={"/group"}
          >
            {page === "/group" ? (
              <HiUserGroup className=" text-fblue w-6 h-6" />
            ) : (
              <HiOutlineUserGroup className="text-gray-400 w-6 h-6" />
            )}
          </Link>
        </div>
        <div className="flex justify-end items-center w-1/4 h-full gap-4">
          <CircleButton
            activePage={"/allMenu"}
            onClick={() => navigate("/allMenu")}
          >
            <BsGrid3X3GapFill />
          </CircleButton>
          <CircleButton
            activePage={"/messenger"}
            onClick={() => navigate("/allMenu")}
          >
            <BsMessenger />
          </CircleButton>
          <CircleButton
            activePage={"/notification"}
            onClick={() => navigate("/allMenu")}
          >
            <IoNotifications />
          </CircleButton>
          <div
            className="w-9 h-9"
            onClick={() => {
              detailDrop ? setDetailDrop(false) : setDetailDrop(true);
            }}
          >
            <FaUserCircle className="w-full h-full text-gray-300 hover:text-blue-200" />
          </div>
        </div>
      </header>
      <div
        className={
          detailDrop
            ? "fixed flex flex-col justify-center items-start z-50 top-[49px] h-fit right-3 bg-white w-[20%] shadow p-4 rounded-lg"
            : "hidden fixed flex flex-col justify-center items-start z-50 top-[49px] h-fit right-3 bg-white w-[20%] shadow p-4 rounded-lg"
        }
      >
        <div className="flex flex-col bg-white shadow rounded-lg p-1 w-full mb-1 unselectable">
          <div className="flex justify-start rounded-lg h-14 px-3 items-center mb-1 gap-3 w-full hover:bg-lgray">
            <FaUserCircle className="h-7 w-auto" />
            <div className="text-lg font-medium">
              {currentUserValue?.user?.firstName +
                " " +
                currentUserValue?.user?.lastName}
            </div>
          </div>
          <div className="border-b-2 border-gray-300 w-full mb-4"></div>
          <div className="text-blue-600 px-3 pb-3">See All Profile</div>
        </div>

        <IconLabel
          icon={<AiTwotoneSetting className="w-[60%] h-[60%]" />}
          style={
            "flex w-full gap-3 justify-start items-center rounded-lg p-3 hover:bg-gray-100"
          }
          onClick={() => console.log("apa")}
        >
          Settings & privacy
        </IconLabel>
        <IconLabel
          icon={<BiSolidHelpCircle className="w-[60%] h-[60%]" />}
          style={
            "flex w-full gap-3 justify-start items-center rounded-lg p-3 hover:bg-gray-100"
          }
          onClick={() => console.log("apa")}
        >
          Help & support
        </IconLabel>
        <IconLabel
          icon={<FaMoon className="w-[60%] h-[60%]" />}
          style={
            "flex w-full gap-3 justify-start items-center rounded-lg p-3 hover:bg-gray-100"
          }
          onClick={toggleTheme}
        >
          Display & accessibility {theme}
        </IconLabel>
        <IconLabel
          icon={<RiFeedbackFill className="w-[60%] h-[60%]" />}
          style={
            "flex w-full gap-3 justify-start items-center rounded-lg p-3 hover:bg-gray-100"
          }
          onClick={() => console.log("apa")}
        >
          Give feedback
        </IconLabel>
        <IconLabel
          icon={<IoLogOut className="w-[60%] h-[60%]" />}
          style={
            "flex w-full gap-3 justify-start items-center rounded-lg p-3 hover:bg-gray-100"
          }
          onClick={() => {
            encryptStorage.removeMultipleItems(["jwtToken", "expireTime"]);
            navigate("/login");
          }}
        >
          Logout
        </IconLabel>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Header;
