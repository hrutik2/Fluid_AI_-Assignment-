import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log(formData)
    axios.post('https://worko-br76.onrender.com/user/register', formData)
    .then((res) => {
        console.log(res)
        alert(res.data.msg)
    })
    .catch((err) => {
        console.log(err)
    })  
   
   
  };

  return (
    <Container>
      <Title>Signup</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Signup</Button>
      </Form>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  width: 30%;
  margin: auto;   
  text-align: center;
  margin-top: 40px;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 480px) {
    width: 90%;
  } 
`;

const Title = styled.h1`
 
  margin-bottom: 20px;
`

const Form = styled.form`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 2px solid #646cff;
  
  background: transparent;
  
 
  
  &:focus {
    outline: none;
    border-color: #535bf2;
  }
`;

const Button = styled.button`
   width: 30%;
   margin: auto;
  background: #646cff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background: #535bf2;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 14px;
  margin-top: 5px;
`;
