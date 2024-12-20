import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import loginImage from "../assets/login.jpg";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { user, handleLogin } = useAuth();
    const { state } = useLocation();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);
            await handleLogin(data);

            setSuccessMessage("Authentication succeed");
        } catch (err) {
            console.log(err);
            setError(
                err.response?.data?.message || "An error occurred during login."
            );
        }
    };

    if (user) return <Navigate to={"/home"} replace />;

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="flex h-full w-full flex-col overflow-hidden bg-white shadow-lg md:flex-row">
                <div
                    className="hidden items-center justify-center md:flex md:w-1/2"
                    style={{
                        background:
                            "linear-gradient(to bottom, #7FB9FF, #C8E5FF)",
                    }}
                >
                    <div className="p-16 text-center">
                        <div
                            className="mx-auto h-96 w-96 bg-cover bg-center"
                            style={{ backgroundImage: `url(${loginImage})` }}
                        />
                        <h1 className="mt-8 text-3xl font-bold text-gray-800">
                            Mulai Cerdas Finansial, Akhiri Kekhawatiran Keuangan
                        </h1>
                        <p className="mt-6 text-xl text-gray-700">
                            Atur Keuangan Anda dengan Mudah di Satu Aplikasi.
                        </p>
                    </div>
                </div>

                <div
                    className="flex w-full items-center justify-center p-10 md:w-1/2"
                    style={{ backgroundColor: "#F3F4F6" }}
                >
                    <div className="w-full max-w-lg">
                        <h2 className="font-david-libre custom-heading text-2xl text-gray-700">
                            Cerdas Financial
                        </h2>
                        {state?.message && (
                            <p className="mt-4 text-green-500">
                                {state.message}
                            </p>
                        )}
                        <form className="mt-6" onSubmit={handleFormSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="mt-2 block w-full rounded-md border bg-white px-4 py-3 text-base focus:border-blue-500 focus:ring-blue-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className="mt-2 block w-full rounded-md border bg-white px-4 py-3 text-base focus:border-blue-500 focus:ring-blue-500"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-4 text-gray-500"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-6 text-right">
                                <a
                                    href="#"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-md px-4 py-3 text-base text-white hover:bg-blue-600 focus:outline-none"
                                style={{ backgroundColor: "#2563EB" }}
                            >
                                Sign in
                            </button>
                        </form>
                        {error && (
                            <p className="mt-6 text-sm text-red-600">{error}</p>
                        )}
                        {successMessage && (
                            <p className="mt-6 text-sm text-green-600">
                                {successMessage}
                            </p>
                        )}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Are you new?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-600 hover:underline"
                                    style={{ color: "#2563EB" }}
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
