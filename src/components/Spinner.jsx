import React from 'react';
import styled, { keyframes } from "styled-components";


const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const StyledImage = styled.img`
    width: 140px;
    height: 100px;
    position: absolute;
    left: 45%;
    top: 45%;
    animation: ${spin} 0.5s linear infinite;
`

export default function Spinner() {
  return <StyledImage src='squad_spinner.png'/>
}
