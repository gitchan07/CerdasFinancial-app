import React, { useState } from "react";
import Card from "../components/Card";
import { Search } from "@mui/icons-material"; // Import the Search icon

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
  // Komentar bagian useDataFetcher
  // const { courses, userProfile, loading, error } = useDataFetcher();

  // Gunakan data dummy langsung
  const courses = dummyCourses;
  const userProfile = { photoUrl: "https://via.placeholder.com/40" };  // Dummy user profile
  const loading = false;  // Simulasikan tidak ada loading
  const error = null;     // Simulasikan tidak ada error

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
    <div className="bg-gray-100 min-h-screen p-4 md:p-16">
      <header className="flex items-center justify-between mb-8 flex-wrap">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">📈 Cerdas Financial</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses"
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 pl-10 bg-gray-200 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 md:w-96" // Update width for PC
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <img
            src={userProfile.photoUrl || "https://via.placeholder.com/40"}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
      <section>
        <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
        <div className="flex gap-4 flex-wrap justify-start"> {/* Add justify-start to left-align */}
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              name={course.name}
              description={course.description}
              progress={course.progress || 0}
              total={course.total || 1}
              imageUrl={course.imageUrl || "https://via.placeholder.com/300x200"}
            />
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">New Courses 🎉</h2>
        <div className="flex gap-4 flex-wrap justify-start"> {/* Add justify-start to left-align */}
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              name={course.name}
              description={course.description}
              progress={course.progress || 0}
              total={course.total || 1}
              imageUrl={course.imageUrl || "https://via.placeholder.com/300x200"}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
