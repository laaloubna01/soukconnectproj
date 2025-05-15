import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../Router/api";
import "../comp_css/order.css";

const OrderDetails = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");
    const [deleted, setDeleted] = useState(false);
    const [allOrder, setAllOrder] = useState([]);

    const handleMakePayment = (orderid) => {
        localStorage.setItem("orderid", orderid);
        navigate("/user/make-payment");
    };

    const handleProfileSection = () => {
        navigate(`/user/profile/${userId}`);
    };

    const handleDeleteOrder = (orderId) => {
        axios
            .delete(`http://127.0.0.1:8080/ecom/orders/users/${userId}/${orderId}`)
            .then((response) => {
                alert(response.data);
                const updatedOrders = allOrder.filter(order => order.orderId !== orderId);
                setAllOrder(updatedOrders);
                setDeleted(true);
            })
            .catch((error) => {
                console.error("API Error: ", error);
            });
    };

    useEffect(() => {
        document.title = "E-commerce | Order Details";
        api
            .get(`/ecom/orders/orders/${userId}`)
            .then((response) => {
                const sorted = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setAllOrder(sorted);
                setDeleted(false);
            })
            .catch((error) => {
                console.error("API Error: ", error);
            });
    }, [deleted, userId]);

    return (
        <div className="order-wrapper">
            <div className="orders-section">
                {allOrder.length > 0 ? (
                    allOrder.map((order, index) => (
                        <div key={index} className="order-card">
                            <div className="order-info">
                                <h3>Commande #{index + 1}</h3>
                                <p><strong>ID:</strong> {order.orderId}</p>
                                <p><strong>Statut:</strong> {order.status}</p>
                                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

                                {order.status === "SHIPPED" ? (
                                    <button className="btn shipped" disabled>SHIPPED</button>
                                ) : (
                                    <>
                                        <button className="btn cancel" onClick={() => handleDeleteOrder(order.orderId)}>Annuler</button>
                                        <button className="btn pay" onClick={() => handleMakePayment(order.orderId)}>Payer</button>
                                    </>
                                )}
                            </div>

                            <div className="order-items">
                                <h4>Articles commandés</h4>
                                <ul>
                                    {order.orderItem.map((item) => (
                                        <li key={item.orderItemId}>
                                            {item.product.name} <span>× {item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-orders">
                        <h2>Aucune commande trouvée</h2>
                    </div>
                )}
            </div>

            <div className="sidebar">
                <h3>Historique de Commandes</h3>
                <button className="btn profile" onClick={handleProfileSection}>Voir Profil</button>
            </div>
        </div>
    );
};

export default OrderDetails;
