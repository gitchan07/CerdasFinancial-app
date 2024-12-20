import { useEffect, useState } from "react";
import { fetchCourses, fetchUserProfile } from "../services/api";

const useDataFetcher = (token) => {
    const [courses, setCourses] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [coursesData, userProfileData] = await Promise.all([
                    fetchCourses(token),
                    fetchUserProfile(token),
                ]);
                setCourses(coursesData);
                setUserProfile(userProfileData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        } else {
            setError(new Error("No token provided"));
        }
    }, [token]);

    return { courses, userProfile, loading, error };
};

export default useDataFetcher;
