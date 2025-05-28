// src/pages/AboutUsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    // Images professionnelles organisées
    const images = {
        heroBackground: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB57FQ6jBiVk1AAlDbBKixEzomOETASES7Ow&s",
        artisans: "https://galeriepalmmenara.com/wp-content/uploads/2023/05/IMG_3953-scaled.jpg",
        marketplace: "https://images.unsplash.com/photo-1585007600263-71228e40c8d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        team: "https://images.unsplash.com/photo-1571260898933-d1ba6d334d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        products: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        moroccanPattern: "https://www.toptal.com/designers/subtlepatterns/uploads/moroccan-floral-dark.png"
    };
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/product');
    };
    // Styles organisés et professionnels
    const styles = {
        // Styles globaux
        global: {
            fontFamily: "'Poppins', 'Helvetica Neue', sans-serif",
            color: '#333',
            lineHeight: 1.8,
            overflowX: 'hidden'
        },

        // Nouveau style pour la section Hero modifiée
        heroModified: {
            padding: '6rem 0',
            backgroundColor: '#f9f9f9',
            position: 'relative'
        },
        heroContent: {
            display: 'flex',
            alignItems: 'center',
            minHeight: '500px'
        },
        heroText: {
            paddingRight: '3rem'
        },
        heroTitleModified: {
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: '#2c3e50',
            lineHeight: 1.3
        },
        heroSubtitleModified: {
            fontSize: '1.2rem',
            marginBottom: '2.5rem',
            color: '#555',
            lineHeight: 1.8
        },
        heroImageContainer: {
            position: 'relative',
            height: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
        },
        heroImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            minHeight: '400px',
            borderRadius: '12px',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'scale(1.03)'
            }
        },
        heroButtonModified: {
            backgroundColor: '#e74c3c',
            border: 'none',
            padding: '12px 35px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '30px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#c0392b',
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
            }
        },

        // Section commune
        section: {
            padding: '6rem 0'
        },
        sectionTitle: {
            fontSize: '2.8rem',
            fontWeight: 700,
            marginBottom: '3rem',
            color: '#2c3e50',
            position: 'relative',
            textAlign: 'center',
            '&::after': {
                content: '""',
                display: 'block',
                width: '80px',
                height: '4px',
                backgroundColor: '#e74c3c',
                margin: '1.5rem auto',
                borderRadius: '2px'
            }
        },
        sectionSubtitle: {
            fontSize: '1.2rem',
            color: '#7f8c8d',
            marginBottom: '3rem',
            textAlign: 'center',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
        },

        // Cartes de mission/valeurs
        featureCard: {
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            height: '100%',
            marginBottom: '2rem',
            '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 15px 30px rgba(231, 76, 60, 0.15)'
            }
        },
        cardBody: {
            padding: '2.5rem 2rem',
            textAlign: 'center'
        },
        iconContainer: {
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
        },
        icon: {
            color: '#e74c3c',
            fontSize: '2rem'
        },
        cardTitle: {
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#2c3e50'
        },
        cardText: {
            color: '#7f8c8d',
            fontSize: '1.1rem'
        },

        // Section histoire/équipe
        contentImage: {
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.3s ease',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            minHeight: '350px',
            '&:hover': {
                transform: 'scale(1.02)'
            }
        },
        contentText: {
            fontSize: '1.15rem',
            marginBottom: '1.5rem',
            color: '#555'
        },

        // Section équipe
        teamSection: {
            background: `url(${images.moroccanPattern})`,
            backgroundAttachment: 'fixed'
        },
        teamCard: {
            border: 'none',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
            backgroundColor: 'rgba(255,255,255,0.95)'
        },

        // Section CTA
        ctaSection: {
            background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            padding: '6rem 0',
            color: 'white',
            textAlign: 'center'
        },
        ctaTitle: {
            fontSize: '2.5rem',
            fontWeight: 700,
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
            color: '#e74c3c',
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
        },

        // Responsive adjustments
        '@media (max-width: 992px)': {
            heroContent: {
                flexDirection: 'column'
            },
            heroText: {
                paddingRight: '0',
                marginBottom: '3rem',
                textAlign: 'center'
            },
            heroTitleModified: {
                textAlign: 'center'
            },
            heroSubtitleModified: {
                textAlign: 'center'
            },
            heroImageContainer: {
                width: '100%'
            }
        },
        '@media (max-width: 768px)': {
            heroModified: {
                padding: '4rem 0'
            },
            heroTitleModified: {
                fontSize: '2.2rem'
            },
            section: {
                padding: '4rem 0'
            },
            sectionTitle: {
                fontSize: '2.2rem'
            }
        }
    };

    return (
        <div style={styles.global}>
            {/* Hero Section Modifiée */}
            <section style={styles.heroModified}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-5 mb-lg-0">
                            <div style={styles.heroText}>
                                <h1 style={styles.heroTitleModified}>Discover SoukConnect</h1>
                                <p style={styles.heroSubtitleModified}>
                                    The e-commerce platform that revolutionizes the discovery of Moroccan craftsmanship through our intelligent recommendation system, connecting local artisans with a global audience.
                                </p>
                                <Button style={styles.heroButtonModified} onClick={handleExploreClick}>
                                    Explore Our Collection
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div style={styles.heroImageContainer}>
                                <Image
                                    src={images.heroBackground}
                                    alt="Artisanat marocain"
                                    fluid
                                    style={styles.heroImage}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Mission Section */}
            <section style={{...styles.section, backgroundColor: '#fff'}}>
                <Container>
                    <h2 style={styles.sectionTitle}>Our Mission</h2>
                    <p style={styles.sectionSubtitle}>
                        We are committed to preserving and promoting the rich Moroccan artisanal heritage while leveraging the latest technologies to offer an exceptional shopping experience.
                    </p>
                    <Row>
                        <Col md={4} className="mb-4">
                            <Card style={styles.featureCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaStore style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Promouvoir l'artisanat</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Offrir une vitrine digitale aux artisans marocains pour valoriser leur savoir-faire traditionnel à l'échelle internationale.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card style={styles.featureCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaUsers style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Connecter les communautés</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Créer un pont direct entre les créateurs marocains et une clientèle mondiale à la recherche d'authenticité.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card style={styles.featureCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaChartLine style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Innovation technologique</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Utiliser l'IA pour personnaliser l'expérience d'achat et mettre en lumière les produits les plus pertinents.
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
                                style={styles.contentImage}
                            />
                        </Col>
                        <Col lg={6}>
                            <h2 style={{...styles.sectionTitle, textAlign: 'left'}}>Notre Histoire</h2>
                            <p style={styles.contentText}>
                                SoukConnect est né en 2024 de la rencontre entre une passion pour le riche patrimoine artisanal marocain et une expertise en technologies modernes.
                            </p>
                            <p style={styles.contentText}>
                                Fondé par Loubna LAASRI et Imane OUTASLA, étudiantes en ingénierie informatique, sous la supervision de Mr. EL BEGGAR Omar, notre projet combine innovation technologique et respect des traditions.
                            </p>
                            <p style={styles.contentText}>
                                À l'approche de la Coupe du Monde 2030 au Maroc, nous nous engageons à offrir aux visiteurs du monde entier une expérience d'achat unique des produits artisanaux marocains.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Values Section */}
            <section style={{...styles.section, backgroundColor: '#fff'}}>
                <Container>
                    <h2 style={styles.sectionTitle}>Nos Valeurs</h2>
                    <p style={styles.sectionSubtitle}>
                        Ces principes fondamentaux guident chacune de nos décisions et interactions.
                    </p>
                    <Row>
                        <Col md={3} className="mb-4">
                            <Card style={styles.featureCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaLeaf style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Authenticité</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Nous garantissons des produits 100% marocains, fabriqués selon les méthodes traditionnelles par des artisans locaux.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} className="mb-4">
                            <Card style={styles.featureCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaHandsHelping style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Équité</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Nous offrons des conditions commerciales justes et transparentes pour nos artisans partenaires.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} className="mb-4">
                            <Card style={styles.featureCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaLightbulb style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Innovation</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Notre système de recommandation intelligent utilise l'IA pour une expérience d'achat personnalisée.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} className="mb-4">
                            <Card style={styles.featureCard}>
                                <Card.Body style={styles.cardBody}>
                                    <div style={styles.iconContainer}>
                                        <FaRecycle style={styles.icon} />
                                    </div>
                                    <Card.Title style={styles.cardTitle}>Durabilité</Card.Title>
                                    <Card.Text style={styles.cardText}>
                                        Nous promouvons des pratiques artisanales durables et éco-responsables, respectueuses de l'environnement.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Team Section */}

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <h2 style={styles.ctaTitle}>Prêt à découvrir l'artisanat marocain ?</h2>
                            <p style={styles.ctaText}>
                                Que vous soyez artisan cherchant à élargir votre audience ou client à la recherche de produits authentiques, rejoignez notre communauté et vivez une expérience d'achat unique avec SoukConnect.
                            </p>
                            <Button style={styles.ctaButton}onClick={handleExploreClick}>
                                Commencer à explorer
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default AboutUsPage;