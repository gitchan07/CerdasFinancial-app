import React, { useState, useEffect } from 'react';

function UserProfile() {
    const [userData, setUserData] = useState({ email: '', full_name: '' });
    const [courseData, setCourseData] = useState({ name: '', description: '' });
    const [error, setError] = useState(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNDY3NDYzMywianRpIjoiMmFhOThiMjktZDY2MC00MDE0LTgzMzctNDRjYzRkNjdiMTk1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjMyMzg4MTJmLTk5ZDUtNDJiNS04NmZkLTY0M2NhMTJhMzk3NSIsIm5iZiI6MTczNDY3NDYzMywiY3NyZiI6IjQ5ZjdiMGYwLTkzNjYtNGU1Mi1hODM1LTdhMzEyMGI5MTU3YSIsImV4cCI6MTczNDY3ODIzMywiZW1haWwiOiJhbWlyaWxtQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiQW1pcmlsIE11a21pbmluIn0.Ug1Xr4NlAcbZi3aeqnojlLym_4hOp3NarEWTbhaQ-Ak'; // Ganti dengan token Anda

    // Mengambil data user dari API (contoh)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                const response1 = await fetch('(https://api-cerdasfinancial.crowintheglass.com/api/v1/me)', { headers });
                const response2 = await fetch('(https://api-cerdasfinancial.crowintheglass.com/api/v1/courses)', { headers });

                if (!response1.ok || !response2.ok) {
                    throw new Error('Gagal mengambil data');
                }

                const userData = await response1.json();
                const courseData = await response2.json();

                console.log(userData); // Cek User Data
                console.log(courseData); // Cek Course Data

                setUserData(userData);
                setCourseData(courseData);
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
                    <p className="profile-course">Course Name: {courseData.name}</p>
                    <p className="profile-desc">Course Desccription: {courseData.description}</p>
                    <p className="profile-subs">Subscription: Yes</p>
                </div>
            </div>
            <button className="edit-profile-btn">Edit Profil</button>
        </div>
    );
}

export default UserProfile;