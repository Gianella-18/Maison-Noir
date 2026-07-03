import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { Container, Row, Col, Form, InputGroup, Card, Button, Pagination, Spinner } from 'react-bootstrap';
import { FaSearch, FaShoppingBag, FaSlidersH } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// ==========================================
//        COMPONENTES ESTILIZADOS (CSS)
// ==========================================
const CatalogoContainer = styled(Container)`
  font-family: 'Montserrat', sans-serif;
`;

const TituloSeccion = styled.h2`
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #1a1a1a;
`;

const ControlBar = styled(Row)`
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #eee;
`;

const TarjetaProducto = styled(Card)`
  border: none;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }
`;

const ContenedorImagen = styled.div`
  position: relative;
  width: 100%;
  padding-top: 120%; /* Proporción vertical tipo catálogo de moda */
  overflow: hidden;
  background-color: #f5f5f5;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${TarjetaProducto}:hover img {
    transform: scale(1.06);
  }
`;

const BadgePrecio = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
`;

// ==========================================
//          COMPONENTE PRINCIPAL
// ==========================================
export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para Búsqueda y Filtros
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  // Estados para Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6; // Cantidad de productos visibles por página

  // 1. Cargar catálogo desde Firestore en tiempo real
  useEffect(() => {
    const productosRef = collection(db, 'productos');
    const unsubscribe = onSnapshot(productosRef, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(lista);
      setLoading(false);
    }, (err) => {
      console.error("Error al traer catálogo:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. LÓGICA DE BÚSQUEDA Y FILTRADO EN TIEMPO REAL
  const productosFiltrados = productos.filter((prod) => {
    const coincideBusqueda = prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                             (prod.descripcion && prod.descripcion.toLowerCase().includes(busqueda.toLowerCase()));
    
    const coincideCategoria = categoriaFiltro === '' || prod.categoria === categoriaFiltro;

    return coincideBusqueda && coincideCategoria;
  });

  // Resetear a la página 1 si el usuario escribe una búsqueda o cambia de categoría
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, categoriaFiltro]);

  // 3. LÓGICA DE PAGINACIÓN
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  // Segmento de productos que se van a renderizar en la página actual
  const productosPaginados = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generar los items visuales del paginador
  let itemsPaginacion = [];
  for (let numero = 1; numero <= totalPaginas; numero++) {
    itemsPaginacion.push(
      <Pagination.Item 
        key={numero} 
        active={numero === paginaActual}
        onClick={() => cambiarPagina(numero)}
      >
        {numero}
      </Pagination.Item>
    );
  }

  if (loading) {
    return (
      <Container className="text-center my-5 p-5">
        <Spinner animation="border" variant="dark" />
        <p className="mt-3 text-muted">Cargando colección Maison Noir...</p>
      </Container>
    );
  }

  return (
    <CatalogoContainer className="my-5">
      {/* REQUERIMIENTO #3: SEO Dinámico */}
      <Helmet>
        <title>Maison Noir | Colección Completa</title>
        <meta name="description" content="Explora nuestro exclusivo catálogo de indumentaria urbana. Diseños minimalistas, remeras oversize, pantalones y accesorios premium." />
        <meta name="keywords" content="moda, ropa urbana, oversize, remeras, pantalones, maison noir, e-commerce" />
      </Helmet>

      <div className="text-center mb-5">
        <TituloSeccion>Nuestra Colección</TituloSeccion>
        <p className="text-muted">Estilo, minimalismo y exclusividad en cada pieza</p>
      </div>

      {/* --- BARRA DE BÚSQUEDA Y FILTROS --- */}
      <ControlBar className="mb-5 align-items-center g-3">
        <Col xs={12} md={6}>
          <Form.Label className="fw-semibold text-muted d-flex align-items-center gap-2 small">
            <FaSearch /> BUSCAR PRODUCTO
          </Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="¿Qué estás buscando? Ej. Remera..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border-end-0"
            />
            <InputGroup.Text className="bg-white border-start-0 text-muted">
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Col>

        <Col xs={12} md={6}>
          <Form.Label className="fw-semibold text-muted d-flex align-items-center gap-2 small">
            <FaSlidersH /> FILTRAR POR CATEGORÍA
          </Form.Label>
          <Form.Select 
            value={categoriaFiltro} 
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="remeras">Remeras</option>
            <option value="pantalones">Pantalones</option>
            <option value="accesorios">Accesorios</option>
          </Form.Select>
        </Col>
      </ControlBar>

      {/* --- RENDERIZADO DEL CATÁLOGO --- */}
      {productosPaginados.length === 0 ? (
        <div className="text-center my-5 p-5 border rounded-3 bg-light">
          <p className="text-muted fs-5 mb-0">No se encontraron productos que coincidan con tu criterio.</p>
        </div>
      ) : (
        <>
          <Row xs={1} sm={2} lg={3} className="g-4">
            {productosPaginados.map((prod) => (
              <Col key={prod.id}>
                <TarjetaProducto>
                  <ContenedorImagen>
                    <img src={prod.imagen} alt={prod.nombre} />
                  </ContenedorImagen>
                  <Card.Body className="d-flex flex-column p-4">
                    <span className="text-uppercase text-muted tracking-wider small mb-1 fw-bold">
                      {prod.categoria || 'Colección'}
                    </span>
                    <Card.Title className="fw-bold mb-2 text-dark fs-5">
                      {prod.nombre}
                    </Card.Title>
                    <Card.Text className="text-muted small text-truncate-2 mb-3">
                      {prod.descripcion || 'Sin descripción disponible.'}
                    </Card.Text>
                    
                    <div className="mt-auto d-flex align-items-center justify-content-between pt-3 border-top">
                      <BadgePrecio>${prod.precio.toFixed(2)}</BadgePrecio>
                      
                      <Button 
                        as={Link} 
                        to={`/producto/${prod.id}`} 
                        variant="dark" 
                        size="sm"
                        className="d-flex align-items-center gap-2 px-3 py-2"
                      >
                        <FaShoppingBag size={14} /> Ver Detalle
                      </Button>
                    </div>
                  </Card.Body>
                </TarjetaProducto>
              </Col>
            ))}
          </Row>

          {/* --- INTERFAZ DEL PAGINADOR --- */}
          {totalPaginas > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination>
                <Pagination.Prev 
                  disabled={paginaActual === 1} 
                  onClick={() => cambiarPagina(paginaActual - 1)}
                />
                {itemsPaginacion}
                <Pagination.Next 
                  disabled={paginaActual === totalPaginas} 
                  onClick={() => cambiarPagina(paginaActual + 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </CatalogoContainer>
  );
}