import React, { useState, useEffect } from 'react';


function UserProfile() {
    const [userData, setUserData] = useState({
        email: '',
        full_name: '',
    });
    const [courseData, setcourseData] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState(null);

    // Mengambil data user dari API (contoh)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch('https://api-cerdasfinancial.crowintheglass.com/api/v1/me');
                const response2 = await fetch('https://api-cerdasfinancial.crowintheglass.com/api/v1/courses');

                const userData = await response1.json();
                const courseData = await response2.json();

                console.log(userData); // Cek User Data
                console.log(courseData); // Cek Course Data
                setUserData(userData);
                setcourseData(courseData);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src="foto_profile.webp" alt="Profile Picture" className="profile-picture"></img>
                <div className="profile-info">
                    <h2 className="profile-name">Name: {userData.full_name}</h2>
                    <p className="profile-email">Email: {userData.email}</p>
                    <p className="profile-course">Nama Kursus:{courseData.name}</p>
                    <p className="profile-desc">Deskripsi Kursus:{courseData.description}</p>
                </div>
            </div>

            <button className="edit-profile-btn">Edit Profil</button>
        </div>
    );
}

export default UserProfile;