import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faSearch,
    faUser,
    faRobot,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");
    const name = localStorage.getItem("name");
    const [expanded, setExpanded] = React.useState(false);

    const handleLoginClick = () => navigate("/login");
    const handleLogoutClick = () => {
        localStorage.removeItem("userid");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("cartid");
        localStorage.removeItem("name");
        alert("Logout Successfully.....");
        navigate("/");
    };

    const styles = `
    .navbar-custom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #9a1f1a;
      color: white;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 1.5rem;
      color: white;
      text-decoration: none;
      transition: transform 0.3s;
    }

    .navbar-brand:hover {
      transform: scale(1.03);
    }

    .navbar-brand i {
      font-size: 1.8rem;
      margin-right: 0.5rem;
    }

    .search-container {
      position: relative;
      width: 40%;
      min-width: 250px;
    }

    .search-container input {
      width: 100%;
      padding: 0.6rem 1.2rem;
      padding-right: 2.8rem;
      border-radius: 25px;
      border: none;
      font-size: 0.95rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .search-icon {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #9a1f1a;
      cursor: pointer;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }

    .nav-action-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      color: white;
      padding: 0.6rem 1rem;
      border-radius: 6px;
      transition: all 0.3s;
      font-weight: 500;
    }

    .nav-action-item:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }

    .nav-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .login-btn {
      background-color: transparent;
      color: white;
      border: 1.5px solid white;
    }

    .signup-btn {
      background-color: white;
      color: #9a1f1a;
    }

    .logout-btn {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1.5px solid rgba(255, 255, 255, 0.3);
    }

    .login-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .signup-btn:hover {
      background-color: #f0f0f0;
    }

    .logout-btn:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 992px) {
      .navbar-custom {
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
      }
      
      .search-container {
        width: 100%;
        order: 3;
        margin-top: 1rem;
      }
      
      .nav-actions {
        width: 100%;
        justify-content: space-between;
      }
    }
  `;

    return (
        <>
            <style>{styles}</style>
            <nav className="navbar-custom">
                <Link
                    className="navbar-brand"
                    to="/"
                    onClick={() => setExpanded(false)}
                >
                    <i className="bi bi-shop"></i>
                    SoukConnect
                </Link>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Rechercher des produits..."
                        onClick={() => navigate("/product")}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>

                <div className="nav-actions">
                    <div
                        className="nav-action-item"
                        onClick={() => navigate("/user/cart")}
                    >
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span>Panier</span>
                    </div>

                    <div
                        className="nav-action-item"
                        onClick={() => navigate("/chatbot")}
                    >
                        <FontAwesomeIcon icon={faRobot} />
                        <span>Assistant</span>
                    </div>

                    {userId ? (
                        <>
                            <div
                                className="nav-action-item"
                                onClick={() => navigate("/user/order-details")}
                            >
                                <FontAwesomeIcon icon={faUser} />
                                <span>{name}</span>
                            </div>
                            <button
                                className="nav-btn logout-btn"
                                onClick={handleLogoutClick}
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="nav-btn login-btn"
                                onClick={handleLoginClick}
                            >
                                <FontAwesomeIcon icon={faUser} />
                                <span>Connexion</span>
                            </button>
                            <button
                                className="nav-btn signup-btn"
                                onClick={() => navigate("/register-user")}
                            >
                                Inscription
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
