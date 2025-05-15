// src/components/Cart.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Router/api";
import "../comp_css/Cart.css";

const Cart = () => {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const cartId = localStorage.getItem("cartid");
    const userId = localStorage.getItem("userid");

    const fetchCartData = () => {
        api
            .get(`/ecom/cart/products/${cartId}`)
            .then((response) => {
                setCartData(response.data);
                setTotalAmount(response.data.totalAmount);
            })
            .catch((error) => {
                console.error("Erreur de récupération du panier :", error);
            });
    };

    useEffect(() => {
        document.title = "Mon Panier | Boutique Rouge";
        fetchCartData();
    }, [cartId]);

    const orderPlaced = () => {
        api
            .post(`/ecom/orders/placed/${userId}`)
            .then(() => {
                alert("Commande passée avec succès !");
                navigate("/user/order-details");
            })
            .catch((error) => {
                console.error("Erreur lors de la commande :", error);
            });
    };

    const emptyCart = () => {
        api
            .delete(`/ecom/cart/empty-Cart/${cartId}`)
            .then(() => {
                alert("Panier vidé.");
                fetchCartData();
            })
            .catch(() => alert("Le panier est déjà vide."));
    };

    const removeProductFromCart = (productId) => {
        api
            .delete(`/ecom/cart/remove-product/${cartId}/${productId}`)
            .then(() => {
                alert("Produit retiré.");
                fetchCartData();
            })
            .catch(() => alert("Erreur lors de la suppression."));
    };

    const increaseQuantity = (productId) => {
        api
            .put(`/ecom/cart/increase-productQty/${cartId}/${productId}`)
            .then(() => fetchCartData());
    };

    const decreaseQuantity = (productId) => {
        api
            .put(`/ecom/cart/decrease-productQty/${cartId}/${productId}`)
            .then(() => fetchCartData())
            .catch(() => alert("Quantité minimale atteinte."));
    };

    return (
        <div className="cart-container">
            <h2 className="cart-header">Mon Panier</h2>

            {cartData.cartItems?.length > 0 ? (
                <div className="cart-content">
                    <div className="cart-items">
                        {cartData.cartItems.map((item) => (
                            <div className="cart-item" key={item.cartItemId}>
                                <img src={item.product.imageUrl} alt={item.product.name} className="item-img" />
                                <div className="item-info">
                                    <h3>{item.product.name}</h3>
                                    <p className="item-cat">{item.product.category}</p>
                                    <p className="item-desc">{item.product.description}</p>
                                    <p className="item-price">MAD {item.product.price}</p>
                                    <div className="quantity-control">
                                        <button onClick={() => decreaseQuantity(item.product.productId)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item.product.productId)}>+</button>
                                    </div>
                                    <button className="btn-remove" onClick={() => removeProductFromCart(item.product.productId)}>
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Résumé</h3>
                        <p className="total-price">Total : <strong>MAD {totalAmount}</strong></p>
                        <button className="btn-order" onClick={orderPlaced}>Commander</button>
                        <button className="btn-clear" onClick={emptyCart}>Vider le panier</button>
                        <button className="btn-orders" onClick={() => navigate("/user/order-details")}>Mes commandes</button>
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <h3>Votre panier est vide</h3>
                    <Link to="/" className="btn-back">Retour à la boutique</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
