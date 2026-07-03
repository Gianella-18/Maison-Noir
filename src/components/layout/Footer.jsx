import './Footer.css';

const equipo = [
  {
    nombre: "Isabelle Fontaine",
    rol: "Directora Creativa",
    bio: "Formada en Paris y Milán, Isabelle lleva 15 años construyendo identidades visuales que trascienden temporadas.",
    inicial: "IF"
  },
  {
    nombre: "Marc Delacroix",
    rol: "Director de Arte",
    bio: "Ex colaborador de maisons históricas europeas, Marc fusiona la artesanía tradicional con la estética contemporánea.",
    inicial: "MD"
  },
  {
    nombre: "Valentina Cruz",
    rol: "Head of Design",
    bio: "Nacida en Buenos Aires, Valentina aporta la sensualidad latina a cada pieza con una mirada geométrica y estructural única.",
    inicial: "VC"
  }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <h2 className="footer__logo">MAISON NOIR</h2>
          <p className="footer__claim">La moda es arquitectura.<br />Es una cuestión de proporciones.</p>
          <p className="footer__atrib">— Coco Chanel</p>
        </div>

        <div className="footer__team">
          <p className="footer__section-label">Equipo Creativo</p>
          <div className="footer__cards">
            {equipo.map((persona) => (
              <div className="team-card" key={persona.nombre}>
                <div className="team-card__avatar">{persona.inicial}</div>
                <div className="team-card__info">
                  <p className="team-card__nombre">{persona.nombre}</p>
                  <p className="team-card__rol">{persona.rol}</p>
                  <p className="team-card__bio">{persona.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__links">
          <span>Contacto</span>
          <span>Prensa</span>
          <span>Showroom</span>
          <span>Careers</span>
        </div>
        <p className="footer__copy">© 2026 Maison Noir. Todos los derechos reservados.
        
        </p>
      </div>
    </footer>
  );
}
