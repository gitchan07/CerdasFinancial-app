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

                if (result.data.status != 200) {
                    throw result.data.msg;
                }

                setState(result.data);
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

    return (
        <AuthContext.Provider value={{ user: state, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
