import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "./pages/TestPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* For initiating react router dom This page can be deleted and replaced*/}
                <Route index element={<TestPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
