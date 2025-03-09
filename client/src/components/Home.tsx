import React from "react";
import styled from "styled-components";

const Home: React.FC = () => {
  return (
    <Wrapper>
      <div className="first-content">
        <h4>
          <span>NEW</span> Explore innovative ways to connect! Dive into our QR
          Code Inspiration Gallery today.
        </h4>
      </div>
    </Wrapper>
  );
};

export default Home;

///// styles
const Wrapper = styled.section`
  width: 100%;
  height: 150vh;

  .first-content {
    width: 100%;
    height: 8vh;
    background-color: #cedafa;
    color: #031f39;
    font-family: sans-serif;
    font-size: 1.1em;
    font-weight: bold;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  .first-content h4 {
    margin: 0;
  }

  .first-content span {
    color: white;
    background-color: #031f39;
    border-radius: 5px;
    padding: 3px 5px;
  }
`;
