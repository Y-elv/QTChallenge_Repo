import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from "../utils/config";
import styled from "styled-components";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/auth/register`, {
        email,
        password,
        username,
      });

      if (response.status === 201) {
        toast.success("SignUp successful !", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error: any) {
      console.error("SignUp Error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong, try again.",
        { position: "top-right" }
      );
    }
  };

  return (
    <Container>
      <Box>
        <Title>Welcome</Title>
        <Subtitle>Sign Up to continue</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Button type="submit">SignUp</Button>
        </Form>
        <StyledLink to="/login">Have an account? Login here</StyledLink>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #cedafa;
`;

const Box = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 255, 0.2);
  text-align: center;
  max-width: 370px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #031f39;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #031f39;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s;

  &::placeholder {
    color: #031f39;
  }

  &:focus {
    border-color: #031f39;
  }
`;

const Button = styled.button`
  background-color: #031f39;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s;

  &:hover {
    color: #031f39;
    background-color: #cedafa;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #031f39;
  font-size: 14px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default Register;
