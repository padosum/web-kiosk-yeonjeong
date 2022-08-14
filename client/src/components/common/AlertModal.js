import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Container from './Container'
import Modal from './Modal'

const AlertModal = ({ message, onClose }) => {
  return (
    <Modal>
      <AlertModalLayout>
        <Container title="알림">
          <AlertMessageWrapper>{message}</AlertMessageWrapper>
          <ButtonWrapper>
            <Button size="sm" variant="normal" onClick={onClose}>
              닫기
            </Button>
          </ButtonWrapper>
        </Container>
      </AlertModalLayout>
    </Modal>
  )
}

const AlertModalLayout = styled.div`
  width: 55rem;
  padding: 4rem;
  font-size: 2rem;
`

const AlertMessageWrapper = styled.div`
  display: flex;
  font-size: 1.8rem;
  margin-bottom: 2.25rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

export default AlertModal
