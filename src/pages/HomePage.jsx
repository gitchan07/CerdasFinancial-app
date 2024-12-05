import React, { useState } from "react";
import useDataFetcher from "../hooks/useDataFetcher";
import Card from "../components/Card";

const HomePage = () => {
  const { courses, userProfile, loading, error } = useDataFetcher();
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
    <div className="bg-gray-100 min-h-screen p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cerdas Financial</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search courses"
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src={userProfile.photoUrl || "https://via.placeholder.com/40"}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recently Viewed</h2>
        <div className="flex gap-4">
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
        <div className="flex gap-4">
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
