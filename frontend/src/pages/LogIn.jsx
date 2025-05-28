import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "SoukConnect | Connexion";
    return () => {
      document.title = "SoukConnect";
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const authHeader = `Basic ${btoa(`${form.username}:${form.password}`)}`;
      const response = await axios.get("http://localhost:8080/ecom/signIn", {
        headers: { Authorization: authHeader },
      });

      if (response.headers.authorization) {
        localStorage.setItem("jwtToken", response.headers.authorization);
        localStorage.setItem("name", response.data.firstNAme || "LogIn");
        localStorage.setItem("userid", response.data.id);
        alert("Connexion réussie");
        navigate("/");
      } else {
        setError("Identifiants invalides");
      }
    } catch (err) {
      setError("Erreur lors de la connexion. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
          className="login-page d-flex align-items-center justify-content-center"
          style={{
            minHeight: "100vh",
            background:
                "linear-gradient(135deg, #c62828 0%, #f9d423 100%)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: "1rem",
          }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={7} lg={5}>
              <Card
                  className="shadow-lg rounded-5"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    boxShadow:
                        "0 8px 32px 0 rgba(198, 40, 40, 0.37)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
              >
                <Card.Body className="p-5">
                  <h2
                      className="text-center mb-4"
                      style={{
                        color: "#c62828",
                        fontWeight: "700",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                      }}
                  >
                    Connexion
                  </h2>

                  {error && (
                      <Alert
                          variant="danger"
                          className="text-center shadow-sm"
                          style={{ fontWeight: "600" }}
                      >
                        {error}
                      </Alert>
                  )}

                  <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-4" controlId="username">
                      <Form.Label
                          style={{ fontWeight: "600", color: "#333" }}
                      >
                        Nom d'utilisateur
                      </Form.Label>
                      <Form.Control
                          type="text"
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          placeholder="Entrez votre nom d'utilisateur"
                          required
                          autoFocus
                          disabled={loading}
                          style={{
                            borderRadius: "12px",
                            padding: "12px 20px",
                            fontSize: "1rem",
                            borderColor: "#c62828",
                            boxShadow: "inset 2px 2px 8px rgba(198, 40, 40, 0.2)",
                            transition: "border-color 0.3s ease",
                          }}
                          onFocus={(e) =>
                              (e.target.style.borderColor = "#f9d423")
                          }
                          onBlur={(e) =>
                              (e.target.style.borderColor = "#c62828")
                          }
                      />
                    </Form.Group>

                    <Form.Group className="mb-5" controlId="password">
                      <Form.Label
                          style={{ fontWeight: "600", color: "#333" }}
                      >
                        Mot de passe
                      </Form.Label>
                      <Form.Control
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          required
                          disabled={loading}
                          style={{
                            borderRadius: "12px",
                            padding: "12px 20px",
                            fontSize: "1rem",
                            borderColor: "#c62828",
                            boxShadow: "inset 2px 2px 8px rgba(198, 40, 40, 0.2)",
                            transition: "border-color 0.3s ease",
                          }}
                          onFocus={(e) =>
                              (e.target.style.borderColor = "#f9d423")
                          }
                          onBlur={(e) =>
                              (e.target.style.borderColor = "#c62828")
                          }
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button
                          variant="danger"
                          type="submit"
                          disabled={loading}
                          className="py-3 fw-semibold"
                          style={{
                            borderRadius: "50px",
                            fontSize: "1.1rem",
                            letterSpacing: "1.2px",
                            boxShadow:
                                "0 6px 12px rgba(198, 40, 40, 0.5)",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#f9d423";
                            e.target.style.color = "#c62828";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#c62828";
                            e.target.style.color = "#fff";
                          }}
                      >
                        {loading ? (
                            <>
                          <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                          ></span>
                              Connexion...
                            </>
                        ) : (
                            "Se connecter"
                        )}
                      </Button>
                    </div>
                  </Form>

                  <p
                      className="mt-5 mb-0 text-center"
                      style={{ color: "#555", fontWeight: "500" }}
                  >
                    Pas encore de compte ?{" "}
                    <Link
                        to="/register-user"
                        className="fw-bold"
                        style={{ color: "#c62828", textDecoration: "none" }}
                        onMouseEnter={(e) =>
                            (e.target.style.textDecoration = "underline")
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.textDecoration = "none")
                        }
                    >
                      Créer un compte
                    </Link>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default Login;
