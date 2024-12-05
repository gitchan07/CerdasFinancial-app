import React, { useState } from "react";
import Card from "../components/Card";
import { Search } from "@mui/icons-material"; // Import the Search icon
import { Link } from "react-router-dom";

// Data dummy
const dummyCourses = [
    {
        id: 1,
        name: "Financial Literacy 101",
        description: "Learn the basics of financial literacy.",
        progress: 50,
        total: 100,
        imageUrl: "https://via.placeholder.com/300x200",
    },
    {
        id: 2,
        name: "Investment Strategies",
        description: "Explore different investment strategies for growth.",
        progress: 30,
        total: 100,
        imageUrl: "https://via.placeholder.com/300x200",
    },
    {
        id: 3,
        name: "Personal Finance Management",
        description: "Master personal finance for a better future.",
        progress: 75,
        total: 100,
        imageUrl: "https://via.placeholder.com/300x200",
    },
];

const HomePage = () => {
    const courses = dummyCourses;
    const userProfile = { photoUrl: "https://via.placeholder.com/40" }; // Dummy user profile
    const loading = false; // Simulasikan tidak ada loading
    const error = null; // Simulasikan tidak ada error

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-8 md:p-16">
            <header className="mb-8 flex items-center justify-between">
                <Link href="#" className="flex items-center">
                    <img
                        src="./logo.png"
                        className="h-16 w-16 md:mr-4"
                        alt="Cerdas Financial"
                    />
                    <span className="hidden font-bold text-2xl md:inline">
                        Cerdas Financial
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search courses"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-52 rounded-full border border-gray-300 bg-gray-200 p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-96" // Update width for PC
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
                    </div>
                    <img
                        src={userProfile.photoUrl || "https://via.placeholder.com/40"}
                        alt="User Profile"
                        className="h-10 w-10 rounded-full mr-6"
                    />
                </div>
            </header>
            <section>
                <h2 className="mb-4 text-2xl font-bold text-blue-600">Recently Viewed</h2>
                <div className="flex flex-wrap justify-start gap-4">
                    {filteredCourses.map((course) => (
                        <Card
                            key={course.id}
                            name={course.name}
                            description={course.description}
                            imageUrl={course.imageUrl || "https://via.placeholder.com/300x200"}
                        />
                    ))}
                </div>
            </section>
            <section className="mt-8">
                <h2 className="mb-4 text-2xl font-semibold text-blue-900">
                    New Courses 🎉
                </h2>
                <div className="flex flex-wrap justify-start gap-4">
                    {filteredCourses.map((course) => (
                        <Card
                            key={course.id}
                            name={course.name}
                            description={course.description}
                            imageUrl={course.imageUrl || "https://via.placeholder.com/300x200"}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
