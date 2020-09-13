import React from 'react';
import styled, { keyframes } from "styled-components";


const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(359deg); }
`;

const StyledImage = styled.img`
    width: 100px;
    height: 83.7px;

    @media only screen and (max-width: 992px) {
      width: 80px;
      height: 67px; 
    }

    position: absolute;
    left: 45%;
    top: 45%;
    animation: ${spin} 0.5s linear infinite;
`

export default function Spinner() {
  return <StyledImage src='squad_spinner.png'/>
}
