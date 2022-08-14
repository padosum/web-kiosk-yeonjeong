import React from 'react'
import styled, { css } from 'styled-components'

const handleModalClick = (e) => {
  e.stopPropagation()
}

const Modal = ({ children, onModalOverlayClick, animation }) => {
  return (
    <ModalOverlay onClick={onModalOverlayClick}>
      <ModalContainer onClick={handleModalClick} animation={animation}>
        {children}
      </ModalContainer>
    </ModalOverlay>
  )
}

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
  background-color: #fff;
  color: #000;
  border: solid;

  ${({ animation }) =>
    animation === 'pop' &&
    css`
      animation: pop 0.5s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
      @keyframes pop {
        from {
          transform: scale(0);
        }
        to {
          transform: scale(1);
        }
      }
    `}
`

export default Modal
