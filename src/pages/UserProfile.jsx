import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/api';
import Header from "../components/Header";

function UserProfile() {
    const [userData, setUserData] = useState({
        full_name: '',
        email: '',
        is_subscribe: 0,
    });
    const [error, setError] = useState(null);
    const token = localStorage.getItem("access_token");
    // console.log(token);

    // Mengambil data user dari API (contoh)
    const fetchData = async () => {
        const headers = {
            'Authorization': `Bearer ${token}`,
        }
        const response = await fetch("https://api-cerdasfinancial.crowintheglass.com/api/v1/me", { headers });


        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            // Fetch USer data
            const usersData = await response.json();
            console.log(usersData);
            setUserData(usersData.users);
            console.log(usersData.users);
            // console.log(userData.full_name);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <Header searchTerm={""} setSearchTerm={""} />
            <div className="profile-container">
                <div className="profile-header">
                    <img src="foto_profile.webp" alt="Profile Picture" className="profile-picture"></img>
                    <div className="profile-info">
                        <h2 className="profile-name">Name: {userData.full_name}</h2>
                        <p className="profile-email">Email: {userData.email}</p>
                        <p className="profile-subs">Subscription: {userData.is_subscribe == 1 ? 'Yes' : 'No'}</p>
                    </div>
                </div>
                <button className="edit-profile-btn">Edit Profil</button>
            </div>

        </div>
    );
}

export default UserProfile;