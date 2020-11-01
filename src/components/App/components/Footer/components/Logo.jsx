import React from 'react';
import styled from "styled-components";

const StyledImage = styled.img`
    @media only screen and (max-width: 992px) {
      width: 45px;
      left: 13px;
      top: 2px;
    }

    width: 80px;
    left: 20px;
    top: 14px;
    transform: rotate(100deg);
    cursor: pointer;
    z-index: 1
`

export default function Logo(props) {
  return <StyledImage onClick={props.onClick} src={`${window.origin}/icons/squad_spinner.svg`}/>
}
