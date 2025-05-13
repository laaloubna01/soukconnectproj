// src/components/RecommendedProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const RecommendedProducts = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Pour afficher un loader pendant le chargement

    // Utilisation de useEffect pour charger les produits lors du montage
    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true); // Début du chargement
            try {
                const response = await axios.get("http://localhost:8080/api/recommendations", {
                    params: category ? { category } : {}, // Filtrer par catégorie si besoin
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des recommandations :", error);
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchRecommendations();
    }, [category]); // Recharger les produits si la catégorie change

    // Affichage d'un loader pendant le chargement des produits
    if (loading) {
        return <div className="text-center p-6">Chargement des produits...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Nos Recommandations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-500">Aucun produit trouvé.</p>
                ) : (
                    products.map((product) => (
                        <div key={product.productId} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-500 mb-2">{product.category}</p>
                                <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                                <p className="text-red-600 font-bold">{product.price} MAD</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecommendedProducts;
