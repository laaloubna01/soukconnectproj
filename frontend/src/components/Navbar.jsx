import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faSearch,
    faUser,
    faRobot,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");
    const name = localStorage.getItem("name");

    const handleLoginClick = () => navigate("/login");
    const handleLogoutClick = () => {
        localStorage.clear();
        alert("Déconnexion réussie !");
        navigate("/");
    };

    const styles = `
    .navbar-custom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 2rem;
      background-color: #9a1f1a;
      color: white;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: sticky;
      top: 0;
      z-index: 1000;
      flex-wrap: wrap;
    }

    .navbar-left {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .navbar-brand {
      font-weight: 700;
      font-size: 1.6rem;
      text-decoration: none;
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search-container {
      position: relative;
      width: 380px;
    }

    .search-container input {
      width: 100%;
      padding: 0.6rem 1rem;
      border-radius: 50px;
      border: none;
      font-size: 0.95rem;
    }

    .search-container .search-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #9a1f1a;
      font-size: 1.1rem;
      cursor: pointer;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      font-weight: 500;
      color: white;
    }

    .nav-item:hover {
      text-decoration: underline;
    }

    .nav-btn {
      padding: 0.4rem 0.9rem;
      border-radius: 5px;
      font-weight: 600;
      border: none;
      cursor: pointer;
    }

    .login-btn {
      background: transparent;
      color: white;
      border: 1.5px solid white;
    }

    .signup-btn {
      background-color: white;
      color: #9a1f1a;
    }

    .logout-btn {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    @media (max-width: 768px) {
      .navbar-custom {
        flex-direction: column;
        align-items: flex-start;
      }

      .navbar-left, .navbar-right {
        width: 100%;
        margin-top: 0.5rem;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .search-container {
        width: 100%;
        margin-top: 0.5rem;
      }
    }
  `;

    return (
        <>
            <style>{styles}</style>
            <nav className="navbar-custom">
                <div className="navbar-left">
                    <Link className="navbar-brand" to="/">
                        <i className="bi bi-shop"></i> SoukConnect
                    </Link>

                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Rechercher des produits..."
                            onClick={() => navigate("/product")}
                        />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </div>
                </div>

                <div className="navbar-right">
                    <div className="nav-item" onClick={() => navigate("/aboutUsPage")}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <span>About Us</span>
                    </div>

                    <div className="nav-item" onClick={() => navigate("/chatbot")}>
                        <FontAwesomeIcon icon={faRobot} />
                        <span>Assistant</span>
                    </div>

                    <div className="nav-item" onClick={() => navigate("/user/cart")}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span>Panier</span>
                    </div>

                    {userId ? (
                        <>
                            <div className="nav-item" onClick={() => navigate("/user/order-details")}>
                                <FontAwesomeIcon icon={faUser} />
                                <span>{name}</span>
                            </div>
                            <button className="nav-btn logout-btn" onClick={handleLogoutClick}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="nav-btn login-btn" onClick={handleLoginClick}>
                                <FontAwesomeIcon icon={faUser} /> Connexion
                            </button>
                            <button className="nav-btn signup-btn" onClick={() => navigate("/register-user")}>
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
