import React, { useState } from "react";
import "../comp_css/paymentForm.css";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa"; // Icône professionnelle

const PaymentForm = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(paymentData);
    navigate("/user/payment-success");
  };

  return (
      <div className="payment-form-wrapper">
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="icon-wrapper">
            <FaCreditCard className="payment-icon" />
          </div>
          <h2 className="form-title">Paiement Sécurisé</h2>

          <div className="form-group">
            <label htmlFor="cardNumber">Numéro de carte</label>
            <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardHolder">Nom du titulaire</label>
            <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={paymentData.cardHolder}
                onChange={handleInputChange}
                placeholder="Jean Dupont"
                required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expirationDate">Date d’expiration</label>
              <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={paymentData.expirationDate}
                  onChange={handleInputChange}
                  placeholder="MM/AA"
                  required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  placeholder="***"
                  required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Payer maintenant
          </button>
        </form>
      </div>
  );
};

export default PaymentForm;
