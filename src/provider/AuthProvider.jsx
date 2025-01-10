import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCurrentUser, login } from "../services/api";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
    const [state, setState] = useState();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const result = await getCurrentUser(accessToken);

                if (result.status !== 200) {
                    throw result.data.msg;
                }

                setState(result.data.users);
            } catch (error) {
                console.log(error);
                setState(null);
            }
        };

        fetchCurrentUser();
    }, []);

    const handleLogin = async (formData) => {
        const result = await login(formData);

        const { access_token, refresh_token, users } = result.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        setState(users);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setState(null); // Clear user data from state
    };

    return (
        <AuthContext.Provider value={{ user: state, handleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
