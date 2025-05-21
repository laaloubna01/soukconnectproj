import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const pageData = {
        heroSlides: [
            {
                title: "L'Authenticité Marocaine",
                description: "Découvrez des produits 100% marocains fabriqués avec passion",
                image: "https://www.lopinion.ma/photo/art/grande/78617980-57046992.jpg?v=1709056728",
                buttonText: "Explorer"
            },
            {
                title: "Artisanat",
                description: "Des créations uniques issues de notre riche patrimoine",
                image: "https://marrakech-foryou.com/wp-content/uploads/2024/07/activites-marrakech-importance-artisanat-economie.jpg",
                buttonText: "Découvrir"
            },
            {
                title: "Saveurs du Maroc",
                description: "Des produits alimentaires naturels et authentiques",
                image: "https://article19.ma/accueil/wp-content/uploads/2017/02/ob_2cd870_banquet-marocain.jpg",
                buttonText: "Déguster"
            }
        ],
        categories: [
            {
                name: "Beauté",
                icon: "bi-droplet",
                image: "https://natusmarrakech.com/cdn/shop/files/gamme_corps_web_categ.png?v=1677251739",
                description: "Produits de beauté naturels"
            },
            {
                name: "Alimentation",
                icon: "bi-basket",
                image: "https://partir.ouest-france.fr/images/cuisine/maroc.jpeg",
                description: "Saveurs authentiques"
            },
            {
                name: "Artisanat",
                icon: "bi-brush",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPGCjiLqWIXbYn_-eQdot2z2RB3bub2o2NNw&s",
                description: "Créations traditionnelles"
            },
            {
                name: "Textile",
                icon: "bi-scissors",
                image: "https://www.consortiummarocain.com/images/products/Items/textile.jpg",
                description: "Tissus et vêtements"
            },
            {
                name: "Accessoires",
                icon: "bi-gem",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCd-GAwsP6QmDsGUQfSZv-jCZPsMnyofnTeQ&s",
                description: "Bijoux et décorations"
            }
        ],
        recommendedProducts: [
            {
                id: 1,
                name: "Huile d'Argan Bio",
                price: "150 DH",
                description: "Pure huile d'argan du Souss, 100% naturelle",
                image: "https://www.bionoble.co/cdn/shop/products/Bionoble-huile-vegetale-huile-d-argan-bio-100ml-utilisation-fiche-produit_750x.jpg?v=1737538901",
                category: "Beauté",
                rating: 4.8
            },
            {
                id: 2,
                name: "Thé à la Menthe",
                price: "65 DH",
                description: "Mélange premium de thé vert et menthe fraîche",
                image: "https://static.750g.com/images/1200-675/93b965f1ba7452221f1f0615b0fb656b/adobestock-179261937-1-.jpeg",
                category: "Alimentation",
                rating: 4.5
            },
            {
                id: 3,
                name: "Tapis Beni Ouarain",
                price: "2200 DH",
                description: "Tapis berbère en laine naturelle",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMnANmr562PMymFWEsIAI0fdqpThv1ZJ1_Yw&s",
                category: "Textile",
                rating: 4.9
            },
            {
                id: 4,
                name: "Poteries de Fès",
                price: "350 DH",
                description: "Artisanat traditionnel marocain",
                image: "https://www.palaisfaraj.com/wp-content/uploads/2024/08/blog-palais-faraj-luxury-poterie-Fes-quoi-rapporter-du-maroc-4.jpg",
                category: "Artisanat",
                rating: 4.7
            },
            {
                id: 5,
                name: "Couscous Royal",
                price: "120 DH",
                description: "Mélange de semoule et légumes secs",
                image: "https://assets.afcdn.com/recipe/20200408/109520_w1024h1024c1cx1060cy707.webp",
                category: "Alimentation",
                rating: 4.6
            },
            {
                id: 6,
                name: "Lanterne Marocaine",
                price: "280 DH",
                description: "Lanterne en métal sculpté",
                image: "https://www.marocopedia.com/wp-content/uploads/2021/01/lanterne-marocaine.jpg",
                category: "Décoration",
                rating: 4.4
            }
        ],
        artisans: [
            {
                name: "Coopérative d'Argan",
                location: "Région de Souss",
                description: "Producteurs d'huile d'argan biologique depuis 3 générations",
                image: "https://explore-agadirsoussmassa.com/wp-content/uploads/2020/04/argan321.jpg"
            },
            {
                name: "Tisseurs Beni Ouarain",
                location: "Moyen Atlas",
                description: "Créateurs de tapis berbères traditionnels en laine naturelle",
                image: "https://www.tapisberberes.fr/upload/2021/08/07/20210807183704-ab608f32.jpg"
            },
            {
                name: "Potiers de Fès",
                location: "Fès Médina",
                description: "Maîtres potiers perpétuant des techniques ancestrales",
                image: "https://www.palaisfaraj.com/wp-content/uploads/2024/08/blog-palais-faraj-luxury-poterie-Fes-quoi-rapporter-du-maroc-Une.jpg"
            }
        ]
    };

    const SectionHeader = ({ title, subtitle, center = true }) => (
        <div className={`mb-5 ${center ? 'text-center' : ''}`}>
            <h2 className="fw-bold text-danger">{title}</h2>
            {subtitle && <p className="text-muted">{subtitle}</p>}
        </div>
    );

    const RatingStars = ({ rating }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
                />
            );
        }
        return <div className="mb-2">{stars}</div>;
    };

    const ProductCard = ({ product }) => (
        <Card className="h-100 border-0 shadow-sm product-card">
            <div className="product-image-container position-relative">
                <Card.Img variant="top" src={product.image} className="product-image" />
                <span className="product-badge bg-danger position-absolute">{product.category}</span>
                <div className="product-overlay d-flex align-items-center justify-content-center">
                    <Button variant="danger" size="sm">
                        <i className="bi bi-eye-fill me-1"></i> Voir détails
                    </Button>
                </div>
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <RatingStars rating={product.rating} />
                <Card.Text className="text-muted small mb-3">{product.description}</Card.Text>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-danger h5">{product.price}</span>
                    <Button variant="danger" size="sm" className="rounded-circle">
                        <i className="bi bi-cart-plus"></i>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );

    const CategoryCard = ({ category }) => (
        <div className="category-card text-center p-4 h-100">
            <div className="category-icon mb-3">
                <i className={`bi ${category.icon} display-4 text-danger`}></i>
            </div>
            <h5 className="fw-bold">{category.name}</h5>
            <p className="text-muted small">{category.description}</p>
            <Button
                variant="outline-danger"
                size="sm"
                className="mt-2"
                onClick={() => navigate('/product')}
            >
                Explorer <i className="bi bi-arrow-right ms-1"></i>
            </Button>
        </div>
    );

    const ArtisanCard = ({ artisan }) => (
        <Card className="h-100 border-0 shadow-sm artisan-card overflow-hidden">
            <div className="artisan-image-container">
                <Card.Img variant="top" src={artisan.image} />
            </div>
            <Card.Body className="text-center">
                <Card.Title>{artisan.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    {artisan.location}
                </Card.Subtitle>
                <Card.Text className="mb-3">{artisan.description}</Card.Text>
                <Button variant="outline-danger">
                    <i className="bi bi-shop me-1"></i> Visiter boutique
                </Button>
            </Card.Body>
        </Card>
    );

    return (
        <div className="home-page">
            {/* Hero Carousel */}
            {/* Hero Carousel */}
            <Carousel fade controls={true} indicators={false} interval={3000} className="hero-carousel mb-5">
                {pageData.heroSlides.map((slide, index) => (
                    <Carousel.Item key={index}>
                        <div
                            className="hero-slide"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "80vh"
                            }}
                        >
                            <div className="hero-content text-center d-flex flex-column justify-content-center h-100 text-white">
                                <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
                                <p className="lead mb-4">{slide.description}</p>
                                <Button
                                    variant="danger"
                                    size="lg"
                                    className="px-4 py-2"
                                    onClick={() => navigate('/product')}
                                >
                                    {slide.buttonText} <i className="bi bi-arrow-right ms-2"></i>
                                </Button>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>


            {/* Catégories */}
            <section className="py-5 bg-light">
                <Container className="px-4">
                    <SectionHeader
                        title="Nos Catégories"
                        subtitle="Découvrez nos différentes gammes de produits"
                    />
                    <Row className="g-4 justify-content-center">
                        {pageData.categories.map((category, index) => (
                            <Col key={index} xl={2} lg={3} md={4} sm={6} className="d-flex">
                                <CategoryCard category={category} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Produits Recommandés */}
            <section className="py-5">
                <Container>
                    <SectionHeader
                        title="Nos Recommandations"
                        subtitle="Découvrez nos sélections du moment"
                    />
                    <Row className="g-4">
                        {pageData.recommendedProducts.map(product => (
                            <Col key={product.id} xl={3} lg={4} md={6} className="d-flex">
                                <ProductCard product={product}/>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center mt-5">
                        <Button
                            variant="danger"
                            className="px-4"
                            onClick={() => navigate('/product')}
                        >
                            Voir tous les produits <i className="bi bi-arrow-right ms-2"></i>
                        </Button>
                    </div>

                </Container>
            </section>

            {/* Artisans */}
            <section className="py-5 bg-light">
                <Container>
                    <SectionHeader
                        title="Nos Artisans Partenaires"
                        subtitle="Des savoir-faire transmis de génération en génération"
                    />
                    <Row className="g-4">
                        {pageData.artisans.map((artisan, index) => (
                            <Col key={index} lg={4} className="d-flex">
                                <ArtisanCard artisan={artisan} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );


};

export default HomePage;