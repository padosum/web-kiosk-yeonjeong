import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Container from './Container'
import Modal from './Modal'

const ConfirmModal = ({ title, onCancel, onAccept }) => {
  return (
    <Modal>
      <ConfirmModalLayout>
        <Container title="알림">
          <ConfirmMessageWrapper>{title}</ConfirmMessageWrapper>
          <ButtonWrapper>
            <Button size="sm" variant="normal" onClick={onCancel}>
              아니오
            </Button>
            <Button size="sm" variant="danger" onClick={onAccept}>
              네
            </Button>
          </ButtonWrapper>
        </Container>
      </ConfirmModalLayout>
    </Modal>
  )
}

const ConfirmModalLayout = styled.div`
  width: 55rem;
  padding: 4rem;
  font-size: 2rem;
`

const ConfirmMessageWrapper = styled.div`
  display: flex;
  font-size: 1.8rem;
  margin-bottom: 2.25rem;
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  > button {
    margin-right: 1.5rem;
  }
`

export default ConfirmModal
