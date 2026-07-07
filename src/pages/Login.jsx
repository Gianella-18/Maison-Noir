import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { usuario, esAdmin, loginUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirige recién cuando el AuthContext confirma que la sesión de admin quedó activa
  useEffect(() => {
    if (usuario && esAdmin) {
      navigate('/gestion/productos');
    }
  }, [usuario, esAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUsuario(email, password);
      // No navegamos acá directamente: el useEffect de arriba se encarga
      // apenas el contexto confirme la sesión, evitando el rebote al login.
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError('Correo electrónico o contraseña incorrectos.');
      } else {
        setError('Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Maison Noir</h2>
              <h4 className="text-center text-muted mb-4">Acceso Administrador</h4>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="admin@admin.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Verificando...' : 'Ingresar'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
