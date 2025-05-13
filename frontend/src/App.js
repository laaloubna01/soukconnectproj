import React from 'react';
import { useLocation } from 'react-router-dom';

import AllRoutes from './Router/AllRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    const location = useLocation();

    const isRestrictedPath = [
        "/login",
        "/register-user",
        "/admin-login",
        "/admin/admin"
    ].includes(location.pathname);

    return (
        <div className="d-flex flex-column min-vh-100">
            {!isRestrictedPath && <Navbar />}

            <main className="flex-grow-1 py-4">
                <AllRoutes />
            </main>

            {!isRestrictedPath && <Footer />}
        </div>
    );
}

export default App;
