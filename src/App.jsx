import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "./pages/TestPage";
import DetailCourse from "./pages/detail-course";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<TestPage />} />
                <Route path="/detail-course" element={<DetailCourse />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
