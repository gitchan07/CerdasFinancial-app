import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const Header = ({ searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { user, logout } = useAuth();
    const dropdownRef = useRef(null);
    const profileButtonRef = useRef(null);

    // Safely handle null or undefined user
    const userProfile = user
        ? { name: user.name || "Anonymous", photoUrl: user.photoUrl || "" }
        : { name: "Anonymous", photoUrl: "" };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };

    const handleClickOutside = (e) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target) &&
            profileButtonRef.current &&
            !profileButtonRef.current.contains(e.target)
        ) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="mb-8 flex flex-wrap items-center justify-between">
            <Link href="#" className="flex items-center">
                <img
                    src="/logo.png"
                    className="h-16 w-16 md:mr-4"
                    alt="Cerdas Financial"
                />
                <span className="hidden font-bold text-blue-900 md:inline">
                    Cerdas Financial
                </span>
            </Link>
            <div className="relative flex items-center gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search courses"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-64 rounded-full border border-gray-300 bg-gray-200 p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-96"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
                </div>
                <div
                    ref={profileButtonRef}
                    className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-500 font-bold text-white"
                    onClick={toggleDropdown}
                >
                    {userProfile.photoUrl ? (
                        <img
                            src={userProfile.photoUrl}
                            alt="User Profile"
                            className="h-10 w-10 rounded-full"
                        />
                    ) : (
                        getInitials(userProfile.name)
                    )}
                </div>
                {dropdownVisible && (
                    <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-36 w-40 rounded-md border bg-white shadow-md "
                    >
                        <ul>
                            <li
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                onClick={() => navigate("/profile")}
                            >
                                Profile
                            </li>
                            <li
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
