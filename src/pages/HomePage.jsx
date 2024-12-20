import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import { Search } from "@mui/icons-material";
import { fetchCourses } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState(null); // State untuk kursus yang terakhir dilihat
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, logout } = useAuth();
    const userProfile = user
        ? { name: user.name || "Anonymous", photoUrl: user.photoUrl }
        : null;

    useEffect(() => {
        if (!user) {
            navigate("/"); // Jika pengguna belum login, arahkan ke halaman login
        }
    }, [user, navigate]);

    useEffect(() => {
        const loadCourses = async () => {
            const accessToken = localStorage.getItem("access_token");

            if (!accessToken) {
                setLoading(false);
                setError("User not authenticated");
                return;
            }

            try {
                const fetchedCourses = await fetchCourses(accessToken);
                if (fetchedCourses && Array.isArray(fetchedCourses.data)) {
                    setCourses(fetchedCourses.data);

                    // Ambil ID kursus terakhir yang dilihat berdasarkan ID pengguna
                    const lastViewedCourseId = localStorage.getItem(`${user.id}_lastViewedCourseId`);
                    if (lastViewedCourseId) {
                        const course = fetchedCourses.data.find(course => course.id === lastViewedCourseId);
                        setRecentlyViewed(course); // Set kursus terakhir dilihat
                    }
                } else {
                    setError("Invalid data format");
                }
            } catch (err) {
                console.error("Error fetching courses:", err);
                setError("Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, [user]);

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

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCourseClick = (courseId) => {
        if (!user) return; // Jika tidak ada pengguna yang login, jangan lakukan apa-apa

        // Simpan ID kursus yang terakhir dilihat oleh pengguna di localStorage
        localStorage.setItem(`${user.id}_lastViewedCourseId`, courseId);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error}</p>;

    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-16">
            <header className="mb-8 flex flex-wrap items-center justify-between">
                <h1 className="mb-4 text-3xl font-bold md:mb-0">
                    📈 Cerdas Financial
                </h1>
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
                        <div className="absolute right-0 mt-12 w-40 rounded border bg-white shadow-md">
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
            <section>
                <h2 className="mb-4 text-xl font-bold">Recently Viewed</h2>
                <div className="flex flex-wrap justify-start gap-4">
                    {recentlyViewed ? (
                        <Link to={`/course/${recentlyViewed.id}`} onClick={() => handleCourseClick(recentlyViewed.id)}>
                            <Card
                                key={recentlyViewed.id}
                                name={recentlyViewed.name}
                                description={recentlyViewed.description}
                                progress={recentlyViewed.progress || 0}
                                total={recentlyViewed.total || 1}
                                imageUrl={
                                    recentlyViewed.imageUrl ||
                                    "https://via.placeholder.com/300x200"
                                }
                            />
                        </Link>
                    ) : (
                        <p>No recently viewed courses.</p>
                    )}
                </div>
            </section>
            <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    New Courses 🎉
                </h2>
                <div className="flex flex-wrap justify-start gap-4">
                    {filteredCourses.map((course) => (
                        <Link to={`/course/${course.id}`} key={course.id} onClick={() => handleCourseClick(course.id)}>
                            <Card
                                name={course.name}
                                description={course.description}
                                progress={course.progress || 0}
                                total={course.total || 1}
                                imageUrl={
                                    course.video_url
                                        ? `https://via.placeholder.com/300x200?text=Video+Thumbnail` // Placeholder untuk video URL
                                        : course.imageUrl ||
                                          "https://via.placeholder.com/300x200" // Fallback gambar lainnya
                                }
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
