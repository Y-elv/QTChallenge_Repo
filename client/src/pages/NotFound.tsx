import React from "react";
import styled from "styled-components";

const NotFound: React.FC = () => {
  return (
    <Container>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </Container>
  );
};

export default NotFound;

///// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #cedafa;
  text-align: center;

  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2em;
  }
`;
