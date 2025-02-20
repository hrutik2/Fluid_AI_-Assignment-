import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      email: email,
      password: password,
    };
    axios
      .post("https://aa-1-7fan.onrender.com/user/login", formData)
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
        localStorage.setItem("token", res.data.token);
         navigate("/");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <Container>
      <Title>Login</Title>
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" >Login</Button>
      </Form>
      <h3>Don't have an account? then first you need to register your account <b> <Link style={{textDecoration:"none",color:"blue"}} to="/singup">Signup</Link></b></h3>
    </Container>
  );
};

export default Login;

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
`;

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
 margin-bottom: 20px;
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
