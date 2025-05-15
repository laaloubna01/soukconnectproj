// src/components/PreferenceModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const PreferenceModal = ({ show, onClose, onSave }) => {
    const [preferences, setPreferences] = useState({
        categories: [],
    });

    const handleCheckboxChange = (category) => {
        setPreferences((prev) => {
            const exists = prev.categories.includes(category);
            return {
                ...prev,
                categories: exists
                    ? prev.categories.filter((c) => c !== category)
                    : [...prev.categories, category],
            };
        });
    };

    const handleSubmit = () => {
        onSave(preferences);
        onClose();
    };

    const allCategories = ['Beauté', 'Alimentation', 'Artisanat', 'Textile', 'Accessoires'];

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Vos Préférences de Produits</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Choisissez les catégories que vous préférez :</Form.Label>
                        {allCategories.map((cat) => (
                            <Form.Check
                                key={cat}
                                type="checkbox"
                                label={cat}
                                checked={preferences.categories.includes(cat)}
                                onChange={() => handleCheckboxChange(cat)}
                            />
                        ))}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Fermer</Button>
                <Button variant="danger" onClick={handleSubmit}>Enregistrer</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PreferenceModal;
