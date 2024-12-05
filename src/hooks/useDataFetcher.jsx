import { useEffect, useState } from "react";
import { fetchCourses, fetchUserProfile } from "../services/api";

const useDataFetcher = () => {
  const [courses, setCourses] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesData, userProfileData] = await Promise.all([
          fetchCourses(),
          fetchUserProfile(),
        ]);
        setCourses(coursesData);
        setUserProfile(userProfileData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { courses, userProfile, loading, error };
};

export default useDataFetcher;
