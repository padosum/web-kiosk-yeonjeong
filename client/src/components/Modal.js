import React from 'react'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.65);
`
const ModalContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 150px auto;
  grid-template-rows: 2fr 1fr;
  grid-template-areas:
    'item option'
    'footer footer';
  width: 55rem;
  padding: 4rem;
  background-color: #fff;
  color: #000;
  border: solid;
`

const handleModalClick = (e) => {
  e.stopPropagation()
}
const Modal = ({ children, onModalOverlayClick }) => {
  return (
    <ModalOverlay onClick={onModalOverlayClick}>
      <ModalContainer onClick={handleModalClick}>{children}</ModalContainer>
    </ModalOverlay>
  )
}

export default Modal
