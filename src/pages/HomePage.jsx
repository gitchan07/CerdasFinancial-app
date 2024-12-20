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

    const { user, setUser } = useAuth();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("access_token");

        if (storedUser && storedToken) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            // Check token expiration directly
            const isTokenExpired = checkTokenExpiration(storedToken);
            if (isTokenExpired) {
                setTokenExpired(true);
            }
        }
    }, [setUser]);

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
                if (fetchedCourses?.data && Array.isArray(fetchedCourses.data)) {
                    setCourses(fetchedCourses.data);

                    const lastViewedCourseId = localStorage.getItem(`${user.id}_lastViewedCourseId`);
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

    // Function to check if the token is expired
    const checkTokenExpiration = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));

        const currentTime = Date.now() / 1000;
        return decodedPayload.exp < currentTime; // Token is expired if exp < current time
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error}</p>;

    if (!user || tokenExpired) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <section>
                <h2 className="mb-4 text-xl text-blue-600 font-bold">Recently Viewed</h2>
                <div className="flex flex-wrap justify-start gap-4">
                    {recentlyViewed ? (
                        <Link
                            to={`/course/${recentlyViewed.id}`}
                            onClick={() => handleCourseClick(recentlyViewed.id)}
                        >
                            <Card
                                key={recentlyViewed.id}
                                name={recentlyViewed.name}
                                description={recentlyViewed.description}
                                progress={recentlyViewed.progress || 0}
                                total={recentlyViewed.total || 1}
                                imageUrl={recentlyViewed.imageUrl || "https://via.placeholder.com/300x200"}
                                progressText={`${recentlyViewed.progress || 0}/${recentlyViewed.total || 1}`}
                                showProgress={true}
                            />
                        </Link>
                    ) : (
                        <p>No recently viewed courses</p>
                    )}
                </div>
            </section>
            <section>
                <h2 className="mb-4 mt-8 text-xl text-blue-600 font-bold">NEW COURSE</h2>{" "}
                <div className="flex flex-wrap justify-start gap-4">
                    {courses.map((course) => (
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
                                imageUrl={course.imageUrl || "https://via.placeholder.com/300x200"}
                                progressText={`${course.progress || 0}/${course.total || 1}`}
                                showProgress={false}
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
