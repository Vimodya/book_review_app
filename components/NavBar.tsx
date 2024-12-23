"use client";
import Image from "next/image";
import { useState, FC, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiUser, FiBox, FiHeart, FiLogOut } from "react-icons/fi";
import SearchBar from "./SearchBar";

const Navbar: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileName, setProfileName] = useState<string | null>("");

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fetch profile name from localStorage or global state
  useEffect(() => {
    const name = localStorage.getItem("profileName"); // Retrieve from localStorage
    if (name) {
      setProfileName(name); // Set the profile name if it exists in localStorage
    }
  }, []);

  return (
    <div>
      <div className="bg-[#F4F4F9] shadow-md py-4 w-screen">
        <div className="flex items-center">
          <div className="flex items-center w-3/5 justify-between">
            {" "}
            <div className="flex items-center ms-12 ">
              <Image
                src="/images/chamodi.jpg"
                alt="Freshmart Logo"
                width={150}
                height={150}
                className="cursor-pointer w-12 h-12"
              />
            </div>
            <div className="ms-12 ">
              <SearchBar />
            </div>
          </div>
          <div className="flex w-2/5 justify-around items-center">
            <div className="text-[#1A202C] font-medium text-sm">Wishlist</div>

            <div className="text-sm font-medium text-[#1A202C]">My Cart</div>

            <div className="relative ">
              <div
                className="flex items-center cursor-pointer  "
                onClick={toggleDropdown}
              >
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-[#1A202C]">
                    {profileName ? profileName : "Profile"}
                  </h2>
                </div>
                <MdKeyboardArrowDown
                  className="ml-1 text-[#1A202C]"
                  size={20}
                />
              </div>

              {isDropdownOpen && (
                <div
                  className="top-full mt-1 bg-[#a58a72]  rounded-lg  p-4 z-50"
                  style={{ position: "absolute" }}
                >
                  <div className="text-center mb-4 flex flex-col items-center  justify-center">
                    <h2 className="text-sm text-[#F4F4F9] font-bold text-center">
                      Hi {profileName ? profileName : "Profile"} ❤️
                    </h2>
                  </div>
                  <div className="border-t border-white my-2 w-48"></div>

                  <div className="flex flex-col text-[#F4F4F9]">
                    <button className="flex items-center py-2 text-sm hover:text-[#1A202C]">
                      <FiUser className="mr-2" /> Manage My Account
                    </button>
                    <button className="flex items-center py-2 text-sm hover:text-[#1A202C]">
                      <FiBox className="mr-2" /> My Reviews
                    </button>
                    <button className="flex items-center py-2 text-sm hover:text-[#1A202C]">
                      <FiLogOut className="mr-2" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
