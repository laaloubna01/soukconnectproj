// src/pages/AboutUsPage.jsx
import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import {
    FaLeaf,
    FaHandsHelping,
    FaLightbulb,
    FaGlobeAfrica,
    FaStore,
    FaUsers,
    FaChartLine,
    FaRecycle
} from 'react-icons/fa';

const AboutUsPage = () => {
    // Images URLs - Professionnelles et thématiques
    const images = {
        moroccanFlag: "",
        marketplace: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskTHzLYeV9-bj5C7Bbvwn-feHw9a0dDIE-A&s",
        artisans: "data:image/jpeg;base64,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",
        team: "https://images.unsplash.com/photo-1571260898933-d1ba6d334d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        pattern: "https://www.toptal.com/designers/subtlepatterns/uploads/morocco-blue.png",
        products: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    };

    // Styles organisés par section
    const styles = {
        // Styles globaux
        global: {
            fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
            color: '#333',
            lineHeight: 1.6
        },

        // Section Hero
        hero: {
            background: `linear-gradient(rgba(249, 243, 240, 0.9), rgba(249, 243, 240, 0.9)), url(${images.pattern})`,
            padding: '5rem 0',
            position: 'relative'
        },
        heroTitle: {
            fontSize: '3.5rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: '#c62828'
        },
        heroSubtitle: {
            fontSize: '1.5rem',
            marginBottom: '2.5rem',
            color: '#555'
        },
        moroccanFlag: {
            width: '120px',
            margin: '2rem 0',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        },
        heroImage: {
            borderRadius: '12px',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
            border: 'none',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)'
            }
        },

        // Section commune
        section: {
            padding: '5rem 0'
        },
        sectionTitle: {
            fontSize: '2.8rem',
            fontWeight: 600,
            marginBottom: '3rem',
            color: '#c62828',
            position: 'relative',
            textAlign: 'center',
            '&::after': {
                content: '""',
                display: 'block',
                width: '80px',
                height: '4px',
                backgroundColor: '#c62828',
                margin: '1rem auto',
                borderRadius: '2px'
            }
        },

        // Cartes de mission
        missionCard: {
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            height: '100%',
            marginBottom: '2rem',
            '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 15px 30px rgba(198, 40, 40, 0.15)'
            }
        },
        cardBody: {
            padding: '2.5rem 2rem',
            textAlign: 'center'
        },
        iconContainer: {
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(198, 40, 40, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
        },
        icon: {
            color: '#c62828',
            fontSize: '2rem'
        },
        cardTitle: {
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#c62828'
        },
        cardText: {
            color: '#666',
            fontSize: '1.1rem'
        },

        // Section histoire
        storyImage: {
            borderRadius: '12px',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'scale(1.02)'
            }
        },
        storyText: {
            fontSize: '1.15rem',
            marginBottom: '1.5rem',
            color: '#555'
        },

        // Section équipe
        teamCard: {
            border: 'none',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        },
        teamImage: {
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(20%)'
        },

        // Section valeurs
        valueIconContainer: {
            width: '70px',
            height: '70px',
            backgroundColor: 'rgba(198, 40, 40, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
        },
        valueTitle: {
            fontSize: '1.3rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#c62828'
        },

        // Section CTA
        ctaSection: {
            background: 'linear-gradient(135deg, #c62828 0%, #8e0000 100%)',
            padding: '5rem 0',
            color: 'white',
            textAlign: 'center'
        },
        ctaTitle: {
            fontSize: '2.5rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
        },
        ctaText: {
            fontSize: '1.2rem',
            marginBottom: '2.5rem',
            opacity: 0.9,
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        ctaButton: {
            backgroundColor: 'white',
            color: '#c62828',
            border: 'none',
            padding: '12px 35px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '30px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#f8f9fa',
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
            }
        }
    };

    return (
        <div style={styles.global}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-5 mb-lg-0">
                            <h1 style={styles.heroTitle}>SoukConnect</h1>
                            <p style={styles.heroSubtitle}>
                                La plateforme e-commerce qui révolutionne la découverte de l'artisanat marocain grâce à
                                notre système de recommandation intelligent.
                            </p>
                            <Image
                                src={images.moroccanFlag}
                                alt="Drapeau marocain"
                                fluid
                                style={styles.moroccanFlag}
                            />
                        </Col>
                        <Col lg={6}>
                            <Image
                                src={images.marketplace}
                                alt="Marché marocain traditionnel"
                                fluid
                                style={styles.heroImage}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Mission Section */}
            <section style={{...styles.section, backgroundColor: '#fff'}}>
                <Container>
                    <h2 style={styles.sectionTitle}>Notre Mission</h2>
                    <Row>
                        <Col md={4} className="mb-4">
                            <Card style={styles.missionCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaStore style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Promouvoir l'artisanat local</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Offrir une vitrine digitale aux artisans marocains pour préserver et valoriser
                                        leur savoir-faire traditionnel à l'échelle internationale.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card style={styles.missionCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaUsers style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Connecter artisans et clients</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Créer un pont direct entre les créateurs marocains et une clientèle mondiale
                                        à la recherche d'authenticité et de qualité artisanale.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card style={styles.missionCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaChartLine style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Innovation technologique</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Utiliser l'intelligence artificielle pour personnaliser l'expérience
                                        d'achat et mettre en lumière les produits les plus pertinents pour chaque visiteur.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Story Section */}
            <section style={{...styles.section, backgroundColor: '#f9f9f9'}}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-5 mb-lg-0">
                            <Image
                                src={images.artisans}
                                alt="Artisans marocains au travail"
                                fluid
                                style={styles.storyImage}
                            />
                        </Col>
                        <Col lg={6}>
                            <h2 style={styles.sectionTitle}>Notre Histoire</h2>
                            <p style={styles.storyText}>
                                SoukConnect est né en 2024 de la rencontre entre une passion pour le riche patrimoine
                                artisanal marocain et une expertise en technologies modernes.
                            </p>
                            <p style={styles.storyText}>
                                Fondé par Loubna LAASRI et Imane OUTASLA, étudiantes en ingénierie informatique,
                                sous la supervision de Mr. EL BEGGAR Omar, notre projet combine innovation
                                technologique et respect des traditions.
                            </p>
                            <p style={styles.storyText}>
                                À l'approche de la Coupe du Monde 2030 au Maroc, nous nous engageons à offrir
                                aux visiteurs du monde entier une expérience d'achat unique et personnalisée
                                des produits artisanaux marocains.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Values Section */}
            <section style={{...styles.section, backgroundColor: '#fff'}}>
                <Container>
                    <h2 style={styles.sectionTitle}>Nos Valeurs</h2>
                    <Row>
                        <Col md={3} className="mb-4">
                            <div style={styles.valueItem}>
                                <div style={styles.valueIconContainer}>
                                    <FaLeaf style={styles.icon} />
                                </div>
                                <h3 style={styles.valueTitle}>Authenticité</h3>
                                <p style={styles.cardText}>
                                    Nous garantissons des produits 100% marocains, fabriqués selon les méthodes
                                    traditionnelles par des artisans locaux.
                                </p>
                            </div>
                        </Col>
                        <Col md={3} className="mb-4">
                            <div style={styles.valueItem}>
                                <div style={styles.valueIconContainer}>
                                    <FaHandsHelping style={styles.icon} />
                                </div>
                                <h3 style={styles.valueTitle}>Équité</h3>
                                <p style={styles.cardText}>
                                    Nous nous engageons à offrir des conditions commerciales justes et transparentes
                                    pour nos artisans partenaires.
                                </p>
                            </div>
                        </Col>
                        <Col md={3} className="mb-4">
                            <div style={styles.valueItem}>
                                <div style={styles.valueIconContainer}>
                                    <FaLightbulb style={styles.icon} />
                                </div>
                                <h3 style={styles.valueTitle}>Innovation</h3>
                                <p style={styles.cardText}>
                                    Notre système de recommandation intelligent utilise l'IA pour mettre en relation
                                    les bons produits avec les bons clients.
                                </p>
                            </div>
                        </Col>
                        <Col md={3} className="mb-4">
                            <div style={styles.valueItem}>
                                <div style={styles.valueIconContainer}>
                                    <FaRecycle style={styles.icon} />
                                </div>
                                <h3 style={styles.valueTitle}>Durabilité</h3>
                                <p style={styles.cardText}>
                                    Nous promouvons des pratiques artisanales durables et éco-responsables,
                                    respectueuses de l'environnement.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Team Section */}
            <section style={{...styles.section, backgroundColor: '#f9f9f9'}}>
                <Container>
                    <h2 style={styles.sectionTitle}>Notre Équipe</h2>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Card style={styles.teamCard}>
                                <Row className="no-gutters">
                                    <Col md={5}>
                                        <Image
                                            src={images.team}
                                            alt="Équipe SoukConnect"
                                            fluid
                                            style={styles.teamImage}
                                        />
                                    </Col>
                                    <Col md={7}>
                                        <Card.Body style={{...styles.cardBody, textAlign: 'left'}}>
                                            <Card.Title style={{...styles.cardTitle, textAlign: 'left'}}>
                                                Rencontrez notre équipe
                                            </Card.Title>
                                            <Card.Text style={styles.cardText}>
                                                <strong>SoukConnect</strong> est le fruit du travail passionné d'une équipe
                                                jeune et dynamique, combinant expertise technique et amour pour la culture marocaine.
                                            </Card.Text>
                                            <Card.Text style={styles.cardText}>
                                                <strong>Loubna LAASRI & Imane OUTASLA</strong>, fondatrices et étudiantes en
                                                ingénierie informatique, ont développé cette plateforme avec l'ambition de
                                                moderniser la commercialisation des produits artisanaux marocains.
                                            </Card.Text>
                                            <Card.Text style={styles.cardText}>
                                                Sous la supervision experte de <strong>Mr. EL BEGGAR Omar</strong>, notre équipe
                                                a créé une solution technologique robuste tout en restant fidèle à l'esprit
                                                authentique des souks marocains.
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <h2 style={styles.ctaTitle}>Prêt à découvrir l'artisanat marocain ?</h2>
                            <p style={styles.ctaText}>
                                Que vous soyez artisan cherchant à élargir votre audience ou client à la recherche
                                de produits authentiques, rejoignez notre communauté et vivez une expérience
                                d'achat unique avec SoukConnect.
                            </p>
                            <Button style={styles.ctaButton}>
                                Explorer la plateforme
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default AboutUsPage;