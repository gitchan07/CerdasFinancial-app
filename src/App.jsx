import { BrowserRouter, Route, Routes } from "react-router-dom";
import Course from "./pages/CoursePage";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./provider/AuthProvider";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import SubcribePage from "./pages/SubcribePage";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/course/:courseId" element={<Course />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/subscribe" element={<SubcribePage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
