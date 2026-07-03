import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // <-- SEO
import styled from 'styled-components'; // <-- STYLED COMPONENTS
import { FaEdit, FaTrash, FaPlus, FaSave, FaBan, FaBoxOpen } from 'react-icons/fa'; // <-- ICONS
import { db } from '../firebase/config';
import { Container, Row, Col, Form, Button, Alert, Card, Table, Modal } from 'react-bootstrap';
import { 
  collection, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore';

// ==========================================
//        COMPONENTES ESTILIZADOS (CSS)
// ==========================================
const SeccionAdmin = styled(Container)`
  font-family: 'Montserrat', sans-serif; /* Un toque elegante para Maison Noir */
`;

const TarjetaPremium = styled(Card)`
  border: 1px solid #eaeaea;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  transition: all 0.3s ease;
`;

const BotonIcono = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border-radius: 50%; /* Botón completamente circular */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const BadgeStock = styled.span`
  padding: 0.35rem 0.65rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  background-color: ${props => props.cantidad > 0 ? '#e6f4ea' : '#fce8e6'};
  color: ${props => props.cantidad > 0 ? '#137333' : '#c5221f'};
`;

const MiniaturaImagen = styled.img`
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
`;

// ==========================================
//          COMPONENTE PRINCIPAL
// ==========================================

export default function AdminProductos() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');
  const [categoria, setCategoria] = useState('');

  const [productos, setProductos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [loading, setLoading] = useState(false);

  // --- ESTADOS PARA EL MODAL DE ELIMINACIÓN ---
  const [showModal, setShowModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  // READ: Firebase real-time
  useEffect(() => {
    const productosRef = collection(db, 'productos');
    const unsubscribe = onSnapshot(productosRef, (snapshot) => {
      const listaProductos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(listaProductos);
    }, (err) => {
      setError("No se pudieron cargar los productos.");
    });
    return () => unsubscribe();
  }, []);

  // CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setExito('');

    if (!nombre.trim()) return setError('El nombre es obligatorio.');
    if (Number(precio) <= 0) return setError('El precio debe ser mayor a 0.');
    if (Number(stock) < 0) return setError('El stock no puede ser negativo.');

    setLoading(true);

    try {
      const datosProducto = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: Number(precio),
        stock: Number(stock),
        imagen: imagen.trim() || 'https://via.placeholder.com/150',
        categoria: categoria,
        fechaActualizacion: new Date()
      };

      if (isEditing) {
        await updateDoc(doc(db, 'productos', editId), datosProducto);
        setExito('¡Producto actualizado con éxito!');
        cancelarEdicion();
      } else {
        datosProducto.fechaCreacion = new Date();
        await addDoc(collection(db, 'productos'), datosProducto);
        setExito('¡Producto agregado con éxito!');
        limpiarFormulario();
      }
    } catch (err) {
      setError('Ocurrió un error al procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA DE ELIMINACIÓN CON MODAL ---
  const abrirModalEliminar = (producto) => {
    setProductoAEliminar(producto);
    setShowModal(true);
  };

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;

    try {
      await deleteDoc(doc(db, 'productos', productoAEliminar.id));
      setExito('Producto eliminado correctamente.');
      if (editId === productoAEliminar.id) cancelarEdicion();
    } catch (err) {
      setError('No se pudo eliminar el producto.');
    } finally {
      setShowModal(false);
      setProductoAEliminar(null);
    }
  };

  const activarEdicion = (producto) => {
    setIsEditing(true); setEditId(producto.id);
    setNombre(producto.nombre); setDescripcion(producto.descripcion || '');
    setPrecio(producto.precio); setStock(producto.stock);
    setImagen(producto.imagen || ''); setCategoria(producto.categoria || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limpiarFormulario = () => {
    setNombre(''); setDescripcion(''); setPrecio(''); setStock(''); setImagen(''); setCategoria('');
  };

  const cancelarEdicion = () => {
    setIsEditing(false); setEditId(null); limpiarFormulario();
  };

  return (
    <SeccionAdmin className="my-5">
      {/* --- REQUERIMIENTO SEO: Gestión de etiquetas meta dinámicas --- */}
      <Helmet>
        <title>{isEditing ? 'Maison Noir | Editando Producto' : 'Maison Noir | Panel de Productos'}</title>
        <meta name="description" content="Panel administrativo seguro de Maison Noir para el control total del catálogo de indumentaria." />
        <meta name="robots" content="noindex, nofollow" /> {/* Seguridad: Evita que Google indexe el panel administrativo */}
      </Helmet>

      {/* SECCIÓN FORMULARIO */}
      <Row className="mb-5">
        <Col md={10} lg={8} className="mx-auto">
          <TarjetaPremium className="p-4">
            <Card.Body>
              <h3 className="mb-4 d-flex align-items-center gap-2 font-weight-bold">
                {isEditing ? <><FaEdit /> Editar Producto</> : <><FaPlus /> Agregar Nuevo Producto</>}
              </h3>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {exito && <Alert variant="success">{exito}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Producto *</Form.Label>
                  <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" rows={2} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio ($) *</Form.Label>
                      <Form.Control type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock Disponible *</Form.Label>
                      <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Categoría</Form.Label>
                      <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">Selecciona una categoría</option>
                        <option value="remeras">Remeras</option>
                        <option value="pantalones">Pantalones</option>
                        <option value="accesorios">Accesorios</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>URL de la Imagen</Form.Label>
                      <Form.Control type="url" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-2 mt-4">
                  <Button variant="dark" type="submit" className="w-100 d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                    {loading ? 'Procesando...' : isEditing ? <><FaSave /> Guardar Cambios</> : <><FaPlus /> Publicar Producto</>}
                  </Button>
                  
                  {isEditing && (
                    <Button variant="outline-secondary" className="d-flex align-items-center gap-2" onClick={cancelarEdicion}>
                      <FaBan /> Cancelar
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </TarjetaPremium>
        </Col>
      </Row>

      {/* SECCIÓN TABLA */}
      <Row>
        <Col md={12}>
          <TarjetaPremium className="p-4">
            <h4 className="mb-4 d-flex align-items-center gap-2">
              <FaBoxOpen /> Catálogo Actual ({productos.length})
            </h4>
            
            {productos.length === 0 ? (
              <p className="text-muted text-center my-4">No hay productos publicados todavía.</p>
            ) : (
              <Table responsive striped bordered hover className="align-middle bg-white">
                <thead className="table-dark">
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id}>
                      <td>
                        <MiniaturaImagen src={prod.imagen} alt={prod.nombre} />
                      </td>
                      <td><strong>{prod.nombre}</strong></td>
                      <td className="text-capitalize text-muted">{prod.categoria || '-'}</td>
                      <td><strong>${prod.precio.toFixed(2)}</strong></td>
                      <td>
                        {/* --- COMPONENTE ESTILIZADO CON PROP DINÁMICA --- */}
                        <BadgeStock cantidad={prod.stock}>
                          {prod.stock > 0 ? `${prod.stock} u.` : 'Sin Stock'}
                        </BadgeStock>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          {/* --- BOTONES CIRCULARES LIMPIOS CON ÍCONOS RECONOCIBLES --- */}
                          <BotonIcono 
                            variant="warning" 
                            onClick={() => activarEdicion(prod)}
                            title="Editar producto"
                          >
                            <FaEdit color="#fff" />
                          </BotonIcono>
                          <BotonIcono 
                            variant="danger" 
                            onClick={() => abrirModalEliminar(prod)}
                            title="Eliminar producto"
                          >
                            <FaTrash />
                          </BotonIcono>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </TarjetaPremium>
        </Col>
      </Row>

      {/* --- MODAL DE CONFIRMACIÓN DE ELIMINACIÓN --- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el producto <strong>"{productoAEliminar?.nombre}"</strong>? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminacion}>
            Sí, Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

    </SeccionAdmin>
  );
}