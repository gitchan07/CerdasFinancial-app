import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Header from "../components/Header";
import { fetchCourses } from "../services/api";

const HomePage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tokenExpired, setTokenExpired] = useState(false);

    const [selectedLetter, setSelectedLetter] = useState("all"); // Default value set to "all"
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Alphabet array

    const { user } = useAuth(); // Get user from context

    useEffect(() => {
        if (!user || tokenExpired) {
            navigate("/login");
        }
    }, [user, tokenExpired, navigate]);

    useEffect(() => {
        const loadCourses = async () => {
            const accessToken = localStorage.getItem("access_token");

            if (!accessToken) {
                setLoading(false);
                setError("User not authenticated");
                return;
            }

            if (!user || !user.id) {
                setLoading(false);
                setError("User is not authenticated or user ID is missing");
                return;
            }

            try {
                const fetchedCourses = await fetchCourses(accessToken);
                if (
                    fetchedCourses?.data &&
                    Array.isArray(fetchedCourses.data)
                ) {
                    setCourses(fetchedCourses.data);

                    const lastViewedCourseId = localStorage.getItem(
                        `${user.id}_lastViewedCourseId`
                    );
                    if (lastViewedCourseId) {
                        const course = fetchedCourses.data.find(
                            (course) => course.id === lastViewedCourseId
                        );
                        setRecentlyViewed(course || null);
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

    const handleCourseClick = (courseId) => {
        localStorage.setItem(`${user.id}_lastViewedCourseId`, courseId);
    };

    const handleLetterFilter = (letter) => {
        setSelectedLetter(letter);
    };

    // Filter courses based on search term and selected letter (if any)
    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLetter =
            selectedLetter === "all" || course.name.startsWith(selectedLetter);
        return matchesSearch && matchesLetter;
    });

    // Sort filtered courses alphabetically
    const sortedCourses = filteredCourses.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error}</p>;

    if (!user || tokenExpired) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <section>
                <h2 className="mb-12 mt-12 flex justify-center text-2xl font-bold text-blue-600">
                    COURSE
                </h2>

                {/* Alphabet Filter */}
                <div className="mb-12 flex flex-wrap justify-center gap-2">
                    <button
                        className={`m-1 rounded px-3 py-1 ${selectedLetter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                        onClick={() => handleLetterFilter("all")}
                    >
                        All
                    </button>
                    {alphabet.map((letter) => (
                        <button
                            key={letter}
                            className={`m-1 rounded px-3 py-1 ${selectedLetter === letter ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                            onClick={() => handleLetterFilter(letter)}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                {/* Courses Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                    {sortedCourses.length > 0 ? (
                        sortedCourses.map((course) => (
                            <Link
                                to={`/course/${course.id}`}
                                onClick={() => handleCourseClick(course.id)}
                                key={course.id}
                            >
                                <Card
                                    name={course.name}
                                    description={course.description}
                                    progress={course.progress || 0}
                                    total={course.total || 1}
                                    imageUrl={course.img_banner || "https://via.placeholder.com/300x200"}
                                    progressText={`${course.progress || 0}/${course.total || 1}`}
                                    showProgress={false}
                                />
                            </Link>
                        ))
                    ) : (
                        <p>No courses found</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
