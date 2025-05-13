import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../comp_css/Product.css";
import api from "../Router/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceOrder, setPriceOrder] = useState("All");
  const [nameSearch, setNameSearch] = useState("");

  const userid = localStorage.getItem("userid");

  const filterProducts = (category, priceOrder, nameSearch, data) => {
    let filtered = data;

    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (priceOrder === "LowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (priceOrder === "HighToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    if (nameSearch !== "") {
      const searchQuery = nameSearch.toLowerCase();
      filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    axios
        .get("http://127.0.0.1:8080/ecom/products/all")
        .then((response) => {
          setProducts(response.data);
          filterProducts(selectedCategory, priceOrder, nameSearch, response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
  }, [selectedCategory, priceOrder, nameSearch]);

  const addProductToCart = (productid) => {
    api
        .post(`/ecom/cart/add-product?userId=${userid}&productId=${productid}`)
        .then((response) => {
          localStorage.setItem("cartid", response.data.cartId);
          alert("Product added to cart");
        })
        .catch((error) => {
          alert(
              error.response?.data?.message ||
              "Error adding product. Please try again later."
          );
        });
  };

  return (
      <div className="product-container">
        <aside className="filter-panel">
          <h3>Filters</h3>
          <label>Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Accessoires">Accessoires</option>
            <option value="Artisanat">Artisanat</option>
            <option value="Textile">Textile</option>
            <option value="Alimentation">Alimentation</option>
            <option value="Beauté">Beauté</option>
          </select>

          <label>Price</label>
          <select value={priceOrder} onChange={(e) => setPriceOrder(e.target.value)}>
            <option value="All">All</option>
            <option value="LowToHigh">Low to High</option>
            <option value="HighToLow">High to Low</option>
          </select>

          <label>Search by name</label>
          <input
              type="text"
              placeholder="e.g. amlou"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
          />
        </aside>

        <section className="products-grid">
          {filteredProducts.length === 0 ? (
              <div className="no-products">No products found.</div>
          ) : (
              filteredProducts.map((product) => (
                  <div className="product-card" key={product.productId}>
                    <img className="product-img" src={product.imageUrl} alt={product.name} />
                    <div className="product-details">
                      <h4>{product.name}</h4>
                      <p className="product-category">{product.category}</p>
                      <p className="product-desc">{product.description.slice(0, 40)}...</p>
                      <p className="product-price">MAD {product.price}</p>
                      <p className="product-rating">
                        Rating: {product.reviews.length > 0 ? product.reviews[0].rating : "N/A"}
                      </p>
                      <div className="btn-group">
                        <button onClick={() => addProductToCart(product.productId)}>Add to Cart</button>
                        <Link to={`/product/${product.productId}`} className="view-link">View</Link>
                      </div>
                    </div>
                  </div>
              ))
          )}
        </section>
      </div>
  );
};

export default Product;
