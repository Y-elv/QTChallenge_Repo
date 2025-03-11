import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import BaseUrl from "../utils/config";
import styled from "styled-components";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: any = await axios.post(`${BaseUrl}/auth/login`, {
        email,
        password,
      });
      console.log("password, email", password, email);

      if (response.status === 200) {
        console.log("am here ", response);
        const token = response.data.data.token;
        localStorage.setItem("token", token);

        toast.success("Login successful! Redirecting...", {
          position: "top-right",
        });

        // Delay before redirecting to the dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000); // 3 seconds delay
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials", {
        position: "top-right",
      });
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to continue</Subtitle>
        <Form onSubmit={handleLogin}>
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
          <Button type="submit">Login</Button>
        </Form>
        <Separator>OR</Separator>
        <GoogleButton
          onClick={() => (window.location.href = `${BaseUrl}/auth/google`)}
        >
          <GoogleIcon /> Login with Google
        </GoogleButton>
        <SignupLink to="/register">
          Don't have an account? Sign up here
        </SignupLink>
      </LoginBox>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #cedafa;
`;

const LoginBox = styled.div`
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
    opacity: 1;
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
    background-color: #cedafa;
    color: #031f39;
  }
`;

const Separator = styled.div`
  margin: 15px 0;
  font-size: 14px;
  color: #777;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: #ccc;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const GoogleIcon = styled(FaGoogle)`
  margin-right: 10px;
  font-size: 18px;
`;

const SignupLink = styled(Link)`
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

export default Login;
