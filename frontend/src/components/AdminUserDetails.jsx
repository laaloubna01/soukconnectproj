import React, { useEffect, useState } from 'react';
import api from '../Router/api';
import '../comp_css/AdminUserDetails.css';

function AdminUserDetails() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        api.get('/ecom/customers/get-all-customer')
            .then(res => setUsers(res.data))
            .catch(err => console.error('Erreur lors de la récupération des utilisateurs:', err));
    };
    console.log("Données envoyées au backend :", newUser);

    const handleAddUser = () => {
        api.post('/ecom/customers', newUser)

            .then(() => {
                fetchUsers();
                setNewUser({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    phoneNumber: ''
                });
            })
            .catch(err => console.error('Erreur lors de l\'ajout de l\'utilisateur:', err));
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
            api.delete(`/ecom/customers/deactivate/${id}`)
                .then(() => fetchUsers())
                .catch(err => console.error('Erreur lors de la suppression de l\'utilisateur:', err));
        }
    };

    const handleUpdatePassword = (userId, password) => {
        const updatedUser = {
            firstName: editUser.firstName,
            lastName: editUser.lastName,
            email: editUser.email,
            password: password
        };

        api.put(`/ecom/customers/update/${userId}`, updatedUser)
            .then(() => {
                fetchUsers();
                setEditUser(null);
            })
            .catch(err => console.error('Erreur lors de la mise à jour du mot de passe:', err));
    };

    return (
        <div className="admin-container">
            <h2 className="section-title">📋 Liste des clients</h2>
            <div className="table-wrapper">
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Status</th>
                        <th className="action-header">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.userAccountStatus}</td>
                            <td className="action-cell">
                                <button
                                    className="btn btn-edit"
                                    onClick={() => setEditUser({ ...user, password: '' })}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => handleDeleteUser(user.userId)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Formulaire d'ajout */}
            <h2 className="section-title">➕ Ajouter un nouveau client</h2>
            <div className="add-form">
                <input
                    placeholder="Prénom"
                    value={newUser.firstName}
                    onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
                />
                <input
                    placeholder="Nom"
                    value={newUser.lastName}
                    onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
                />
                <input
                    placeholder="Email"
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
                <input
                    placeholder="Téléphone"
                    value={newUser.phoneNumber}
                    onChange={e => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                />
            </div>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button className="btn btn-add" onClick={handleAddUser}>Ajouter</button>
            </div>

            {/* Formulaire de modification */}
            {editUser && (
                <div className="edit-form">
                    <h3>✏️ Modifier le mot de passe de {editUser.firstName} {editUser.lastName}</h3>
                    <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        value={editUser.password}
                        onChange={e => setEditUser({ ...editUser, password: e.target.value })}
                    />
                    <div style={{ marginTop: '10px' }}>
                        <button
                            className="btn btn-edit"
                            onClick={() => handleUpdatePassword(editUser.userId, editUser.password)}
                        >
                            Mettre à jour
                        </button>
                        <button
                            className="btn btn-cancel"
                            onClick={() => setEditUser(null)}
                            style={{ marginLeft: '10px' }}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminUserDetails;
