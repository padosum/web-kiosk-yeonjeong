import React from 'react'
import styled from 'styled-components'

const Container = ({ title, children }) => {
  return (
    <ContainerStyle>
      <ContainerTitle>{title}</ContainerTitle>
      {children}
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  position: relative;
  padding: 1.5rem 2rem;
  border: 4px solid #000;
  height: 100%;
`

const ContainerTitle = styled.h3`
  display: table;
  padding: 0 0.5rem;
  margin: -2.5rem 0 1rem;
  font-size: 1.2em;
  background-color: #fff;
  word-break: keep-all;
`

export default Container
