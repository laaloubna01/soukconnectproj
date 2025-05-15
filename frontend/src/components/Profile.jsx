import React, { useState, useEffect } from "react";
import api from "../Router/api";
import "../comp_css/Profile.css";
import Address from "../components/Address";
import UpdateAddress from "../components/UpdateAddress";

const userid = localStorage.getItem("userid");

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [add, setAdd] = useState(null);
    const [addressModal, setAddressModal] = useState(false);
    const [updateaddressModal, setUpdateAddressModal] = useState(false);
    const [showPassSection, setShowPassSection] = useState(false);
    const [passform, setNewPassword1] = useState({ newpass: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const val = e.target.value;
        setNewPassword1({ ...passform, [e.target.name]: val });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api
            .put(`/ecom/customers/update-password/${userid}`, passform)
            .then((response) => {
                alert("Mot de passe mis à jour avec succès !");
                setShowPassSection(false);
            })
            .catch((error) => {
                alert("Erreur lors de la mise à jour du mot de passe.");
            });
    };

    const changePassword = () => {
        setShowPassSection(true);
    };

    const handlerUpdateAddress = (latestAddress) => {
        setAdd(latestAddress);
        setUpdateAddressModal(true);
    };

    const showAddAddressModal = () => setAddressModal(false);
    const handlerAddAddress = () => setAddressModal(true);

    useEffect(() => {
        api
            .get(`/ecom/customers/${userid}`)
            .then((response) => {
                setProfileData(response.data);
                setAddressModal(false);
            })
            .catch((error) => {
                console.error("Erreur API: ", error);
            });
    }, [userid]);

    const { newpass } = passform;
    const latestAddress = profileData?.address?.length
        ? profileData.address[profileData.address.length - 1]
        : null;

    return (
        <div className="profile-wrapper">
            <h2 className="main-title">🧑‍💼 Mon Profil</h2>

            <div className="profile-container">
                {addressModal && <Address onclose={showAddAddressModal} />}
                {updateaddressModal && (
                    <UpdateAddress address={add} onclose={showAddAddressModal} />
                )}

                <div className="profile-details">
                    <h1 className="profile-header">Détails du Profil</h1>
                    {profileData ? (
                        <>
                            <p><strong>Statut:</strong> {profileData.userAccountStatus}</p>
                            <p><strong>Nom:</strong> {profileData.firstName} {profileData.lastName}</p>
                            <p><strong>Email:</strong> {profileData.email}</p>
                            <p><strong>Téléphone:</strong> {profileData.phoneNumber}</p>
                            <p><strong>Inscrit le:</strong> {profileData.registerTime.substring(0, 10)}</p>
                        </>
                    ) : (
                        <p>Chargement des données...</p>
                    )}
                </div>

                <div className="latest-address">
                    {latestAddress ? (
                        <>
                            <h2 className="latest-address-header">📍 Adresse Actuelle</h2>
                            <p><strong>Bâtiment:</strong> {latestAddress.flatNo}</p>
                            <p><strong>Rue:</strong> {latestAddress.street}</p>
                            <p><strong>Ville:</strong> {latestAddress.city}</p>
                            <p><strong>État:</strong> {latestAddress.state}</p>
                            <p><strong>Code Postal:</strong> {latestAddress.zipCode}</p>
                            <button className="btn red" onClick={() => handlerUpdateAddress(latestAddress)}>
                                Mettre à jour l'adresse
                            </button>
                        </>
                    ) : (
                        <>
                            <h2>❌ Aucune adresse enregistrée</h2>
                            <button className="btn red" onClick={handlerAddAddress}>
                                Ajouter une adresse
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="updatePassword">
                {showPassSection ? (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newpass">Nouveau mot de passe :</label>
                        <input
                            type="password"
                            name="newpass"
                            value={newpass}
                            onChange={handleChange}
                            placeholder="••••••••••"
                        />
                        {error && <p className="error">{error}</p>}
                        <button type="submit" className="btn red">Valider</button>
                        <button
                            type="button"
                            className="btn gray"
                            onClick={() => setShowPassSection(false)}
                        >
                            Annuler
                        </button>
                    </form>
                ) : (
                    <button className="btn red" onClick={changePassword}>
                        🔐 Modifier le mot de passe
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
