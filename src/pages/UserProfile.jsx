import React, { useState, useEffect } from 'react';
import { fetchUserProfile, fetchCourses } from '../services/api';

function UserProfile() {
    const [userData, setUserData] = useState({ email: '', full_name: '' });
    const [courseData, setCourseData] = useState({ name: '', description: '' });
    const [error, setError] = useState(null);

    // Mengambil data user dari API (contoh)
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userDataResponse = await fetchUserProfile();
            const courseDataResponse = await fetchCourses();

            setUserData(userDataResponse);
            setCourseData(courseDataResponse);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src="foto_profile.webp" alt="Profile Picture" className="profile-picture"></img>
                <div className="profile-info">
                    {/* <h2 className="profile-name">Name: {userData.full_name}</h2>  
                    <p className="profile-email">Email: {userData.email}</p>
                    <p className="profile-course">Course Name: {courseData.name}</p>
                    <p className="profile-desc">Course Desccription: {courseData.description}</p>
                    <p className="profile-subs">Subscription: Yes</p> */}

                    <h2 className="profile-name">Name: Admin</h2>
                    <p className="profile-email">Email: admin@gmail.com</p>
                    <p className="profile-course">Course Name: Design</p>
                    <p className="profile-desc">Course Desccription: Introduction to design software</p>
                    <p className="profile-subs">Subscription: Yes</p>
                </div>
            </div>
            <button className="edit-profile-btn">Edit Profil</button>
        </div>
    );
}

export default UserProfile;