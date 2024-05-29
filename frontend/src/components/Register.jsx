import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', dob: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/register', formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Register</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Name" required />
                </Form.Group>
                <Form.Group controlId="dob" className="mb-3">
                  <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" required />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </Form.Group>
                <Form.Group controlId="password" className="mb-4"> {/* Increased margin here */}
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">Register</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
