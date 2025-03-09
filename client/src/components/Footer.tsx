import React from "react";
import styled from "styled-components";


const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      © {new Date().getFullYear()} XYZ Company. All rights reserved.
    </FooterWrapper>
  );
};

export default Footer;


const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #ffffff;
  color: #031f39;
  text-align: center;
  padding: 1rem 0;
  font-size: 1rem;
`;
