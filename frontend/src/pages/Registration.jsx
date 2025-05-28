import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/ecom/customers", form);
      if (response.status === 200 || response.status === 201) {
        alert("Votre inscription a réussi !");
        navigate("/login");
      } else {
        setError("Échec de l'inscription, veuillez réessayer.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Erreur lors de l'inscription.");
      } else {
        setError("Erreur lors de l'inscription, veuillez réessayer plus tard.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
          className="registration-page d-flex align-items-center justify-content-center"
          style={{
            minHeight: "100vh",
            backgroundColor: "#fff",
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
                    boxShadow: "0 8px 32px 0 rgba(198, 40, 40, 0.37)",
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
                    Inscription
                  </h2>

                  {error && (
                      <Alert variant="danger" className="text-center shadow-sm" style={{ fontWeight: "600" }}>
                        {error}
                      </Alert>
                  )}

                  <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label style={{ fontWeight: "600", color: "#333" }}>Email</Form.Label>
                      <Form.Control
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          placeholder="Entrez votre email"
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
                          onFocus={(e) => (e.target.style.borderColor = "#f9d423")}
                          onBlur={(e) => (e.target.style.borderColor = "#c62828")}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label style={{ fontWeight: "600", color: "#333" }}>Mot de passe</Form.Label>
                      <Form.Control
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleInputChange}
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
                          onFocus={(e) => (e.target.style.borderColor = "#f9d423")}
                          onBlur={(e) => (e.target.style.borderColor = "#c62828")}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="firstName">
                      <Form.Label style={{ fontWeight: "600", color: "#333" }}>Prénom</Form.Label>
                      <Form.Control
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleInputChange}
                          placeholder="Entrez votre prénom"
                          disabled={loading}
                          style={{
                            borderRadius: "12px",
                            padding: "12px 20px",
                            fontSize: "1rem",
                            borderColor: "#c62828",
                            boxShadow: "inset 2px 2px 8px rgba(198, 40, 40, 0.2)",
                            transition: "border-color 0.3s ease",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#f9d423")}
                          onBlur={(e) => (e.target.style.borderColor = "#c62828")}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label style={{ fontWeight: "600", color: "#333" }}>Nom</Form.Label>
                      <Form.Control
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleInputChange}
                          placeholder="Entrez votre nom"
                          disabled={loading}
                          style={{
                            borderRadius: "12px",
                            padding: "12px 20px",
                            fontSize: "1rem",
                            borderColor: "#c62828",
                            boxShadow: "inset 2px 2px 8px rgba(198, 40, 40, 0.2)",
                            transition: "border-color 0.3s ease",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#f9d423")}
                          onBlur={(e) => (e.target.style.borderColor = "#c62828")}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="phoneNumber">
                      <Form.Label style={{ fontWeight: "600", color: "#333" }}>Téléphone</Form.Label>
                      <Form.Control
                          type="tel"
                          name="phoneNumber"
                          value={form.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Entrez votre numéro de téléphone"
                          disabled={loading}
                          style={{
                            borderRadius: "12px",
                            padding: "12px 20px",
                            fontSize: "1rem",
                            borderColor: "#c62828",
                            boxShadow: "inset 2px 2px 8px rgba(198, 40, 40, 0.2)",
                            transition: "border-color 0.3s ease",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#f9d423")}
                          onBlur={(e) => (e.target.style.borderColor = "#c62828")}
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
                            boxShadow: "0 6px 12px rgba(198, 40, 40, 0.5)",
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
                              Inscription...
                            </>
                        ) : (
                            "S'inscrire"
                        )}
                      </Button>
                    </div>
                  </Form>

                  <p className="mt-4 text-center" style={{ color: "#555", fontWeight: "500" }}>
                    Déjà un compte ?{" "}
                    <Link
                        to="/login"
                        className="fw-bold"
                        style={{ color: "#c62828", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                        onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      Connectez-vous ici
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

export default Registration;
