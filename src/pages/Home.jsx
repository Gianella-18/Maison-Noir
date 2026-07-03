import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-bg">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"
            alt="Maison Noir Collection"
            className="home__hero-img"
          />
          <div className="home__hero-overlay" />
        </div>
        <div className="home__hero-content">
          <p className="home__hero-pre">Otoño — Invierno 2026</p>
          <h1 className="home__hero-title">
            L'élégance<br />
            <em>est une attitude</em>
          </h1>
          <p className="home__hero-sub">Nueva colección disponible</p>
          <Link to="/productos" className="home__hero-cta">
            Explorar Colección
          </Link>
        </div>
      </section>

      {/* Editorial strip */}
      <section className="home__strip">
        <div className="home__strip-item">
          <span className="home__strip-num">01</span>
          <span className="home__strip-text">Alta Costura</span>
        </div>
        <div className="home__strip-divider" />
        <div className="home__strip-item">
          <span className="home__strip-num">02</span>
          <span className="home__strip-text">Materiales Premium</span>
        </div>
        <div className="home__strip-divider" />
        <div className="home__strip-item">
          <span className="home__strip-num">03</span>
          <span className="home__strip-text">Piezas Únicas</span>
        </div>
      </section>

{/*  */}

      {/* Featured grid con collage */}
      <section className="home__featured">
        <div className="home__featured-text">
          <p className="home__label">La Filosofía</p>
          <h2 className="home__featured-title">
            Vestir es<br />una forma<br />de arte
          </h2>
          <p className="home__featured-desc">
            Cada pieza de Maison Noir nace de la convicción de que la ropa no solo cubre el cuerpo — lo transforma. Diseñamos para mujeres que entienden que la elegancia no es superficial, sino estructural.
          </p>
          <Link to="/productos" className="home__link">
            Ver toda la colección →
          </Link>
        </div>

        <div className="home__collage">
          <div className="home__collage-item">
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" alt="Colección 1" />
          </div>
          <div className="home__collage-item">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" alt="Colección 2" />
          </div>
          <div className="home__collage-item">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" alt="Colección 3" />
          </div>
          <div className="home__collage-item">
            <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80" alt="Colección 4" />
          </div>
        </div>
      </section>

      <section className="home__quote">
        <blockquote className="home__quote-text">
          "La moda no es solo ropa. La moda es algo en el aire."
        </blockquote>
        <cite className="home__quote-author">— Coco Chanel</cite>
      </section>
    </div>
  );
}
