import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../redux/reducers/getSearchPageVideos";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { clearVideos, changeSearchTerm } from "../redux/Slices/youtubeSlice";
import ytLogo from "../assets/yt-logo.png";
import ytLogoMobile from "../assets/yt-logo-mobile.png";

export default function Navbar({ handleToggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  const [mobileMenu, setMobileMenu] = useState(false);

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
    handleToggleSidebar(); // Call the sidebar toggle function here as well
  };
  const handleSearch = () => {
    if (location.pathname !== "/search") navigate("/search");
    else {
      dispatch(clearVideos);
      dispatch(getSearchPageVideos(false));
    }
  };



  return (
    <div className="sticky top-0 gap-1 z-50 flex justify-between items-center md:px-5 lg:px-8 xl:px-14 h-14 bg-[#212121] opacity-95 ">
      <div className="flex gap-4 items-center text-2xl">
      <div
      className="flex lg:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
      onClick={mobileMenuToggle}
    >
      {mobileMenu ? (
        <AiOutlineClose className="text-white text-xl" />
      ) : (
        <GiHamburgerMenu className="text-white text-xl" />
      )}
    </div>
        <div className="flex gap-2 items-center justify-center">
          <Link to="/" className="flex h-5 items-center">
            <img
              className="h-full hidden dark:md:block"
              src={ytLogo}
              alt="Youtube"
            />
            <img
              className="h-full md:hidden"
              src={ytLogoMobile}
              alt="Youtube"
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 flex-grow md:flex-grow-0 lg:flex-grow-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex-grow"
        >
          <div className="flex bg-zinc-900 items-center h-10 px-2 rounded-3xl">
            <div className="flex gap-2 items-center flex-grow lg:flex-grow-0 pr-2 lg:pr-5">
              <input
                type="text"
                placeholder="Search"
                className="md:w-64 lg:w-96 bg-zinc-900 focus:outline-none border-none"
                value={searchTerm}
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
              />
            </div>
            <button className="h-10 w-12 lg:w-20 flex items-center justify-center bg-zinc-800 rounded-r-3xl">
              <AiOutlineSearch className="text-xl" />
            </button>
          </div>
        </form>

        {/* Visible on large screens, hidden on small screens */}
        <div className=" hidden text-xl p-3 bg-zinc-900 rounded-full lg:block">
          <FaMicrophone />
        </div>
      </div>
      <div className="flex gap-8 items-center text-xl">
        {/* Visible on large screens, hidden on small screens */}
        <RiVideoAddLine className="lg:block hidden" />
        <div className="relative lg:block hidden">
          <BsBell className="" />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            {" "}
            9+
          </span>
        </div>
        <img
          src="https://media1.thehungryjpeg.com/thumbs2/ori_3809132_oz5y4hsbur234qb3ttlk9ayvn0hrh0g6jetj99pq_monogram-vd-logo-design.jpg"
          alt="profile logo"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </div>
  );
}
