import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const formData = {
  username: "",
  password: "",
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(formData);

  useEffect(() => {
    document.title = "Ecommerse | Admin LogIn";
    return () => {
      document.title = "Ecommerse App";
    };
  }, []);

  const setHandlerChange = (e) => {
    const val = e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const authHeader = `Basic ${btoa(`${form.username}:${form.password}`)}`;
      const response = await axios.get("http://localhost:8080/ecom/signIn", {
        headers: {
          Authorization: authHeader,
        },
      });

      if (response.headers.authorization !== undefined) {
        localStorage.setItem("jwtToken", response.headers.authorization);
        localStorage.setItem("adminid", response.data.id);
        alert("Admin Login successfully");
        navigate("/admin/admin");
      } else {
        alert("Invalid Credential");
        console.error("JWT retrieval failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("Error during login. Please try again later.");
        console.error("Error during login:", error);
      }
    }
  };

  const { username, password } = form;

  return (
      <>
        <h2 className="title">WELCOME TO ADMIN LOGIN PAGE</h2>

        <div className="loginContainer">
          <div className="loginForm">
            <h2 className="formTitle">Admin LogIn</h2>
            <form onSubmit={submitHandler} className="form">
              <div className="formGroup">
                <label htmlFor="username" className="label">Username:</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={setHandlerChange}
                    className="input"
                    placeholder="Enter your username"
                    required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="password" className="label">Password:</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={setHandlerChange}
                    className="input"
                    placeholder="Enter your password"
                    required
                />
              </div>

              <div className="formGroup">
                <button type="submit" className="btnSubmit">Login</button>
              </div>
            </form>
          </div>
        </div>

        <style>{`
        /* Container styles */
        .loginContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 75vh;
          background: linear-gradient(135deg, #2c3e50, #4ca1af);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Login form box */
        .loginForm {
          background-color: #fff;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          width: 350px;
          max-width: 90%;
        }

        .title {
          text-align: center;
          color: #fff;
          margin: 25px 0 10px 0;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .formTitle {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
          font-weight: 600;
          font-size: 1.6rem;
        }

        /* Form groups */
        .formGroup {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }

        .label {
          margin-bottom: 8px;
          font-weight: 600;
          color: #555;
          font-size: 0.9rem;
        }

        .input {
          padding: 12px 15px;
          font-size: 1rem;
          border: 1.8px solid #ccc;
          border-radius: 8px;
          transition: border-color 0.3s ease;
        }

        .input:focus {
          outline: none;
          border-color: #4ca1af;
          box-shadow: 0 0 8px rgba(76, 161, 175, 0.5);
        }

        .btnSubmit {
          background-color: #4ca1af;
          color: white;
          font-weight: 600;
          padding: 12px 0;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: background-color 0.3s ease;
        }

        .btnSubmit:hover {
          background-color: #357f8f;
        }

        /* Responsive */
        @media (max-width: 400px) {
          .loginForm {
            width: 100%;
            padding: 30px 20px;
          }
        }
      `}</style>
      </>
  );
};

export default AdminLogin;
