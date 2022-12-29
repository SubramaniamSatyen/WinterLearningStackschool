import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import List from "./List";
import { RequireAuth, AuthProvider } from "./Auth";
import Login from "./Login";
import SignUp from "./SignUp";

//Rerturn webpage as route header and page body, with endpoints further protected under RequireAuth component
const Site = () => {
    return (
        <div>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route element={<RequireAuth />}>
                            <Route path="/list" element={<List />} />
                        </Route>
                        <Route
                            path="*"
                            element={<Navigate to="/login" replace />}
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    )
}

export default Site;