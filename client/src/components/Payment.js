import React from 'react'
import Modal from './Modal'
import Container from './Container'
import Button from './Button'
import styled, { StyleSheetManager } from 'styled-components'

const PaymentLayout = styled.div`
  width: 55rem;
  padding: 4rem;
`

const ButtonGroupWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem;
`

const CloseButton = styled.button`
  font-size: 1.5rem;
`

const Payment = ({ onHandleLoading, onHandleSubmit, setStep }) => {
  const handleCashPayment = () => {
    onHandleSubmit({ id: 1, title: '현금' })
  }

  const handleCardPayment = () => {
    onHandleLoading()

    const MIN_SECONDS = 3
    const MAX_SECONDS = 7
    const rand = Math.floor(
      Math.random() * (MAX_SECONDS - MIN_SECONDS + 1) + MIN_SECONDS
    )
    setTimeout(() => {
      onHandleLoading()
      onHandleSubmit({ id: 2, title: '카드' })
    }, rand * 1000)
  }

  return (
    <Modal>
      <ButtonWrapper>
        <CloseButton onClick={() => setStep('main')}>X</CloseButton>
      </ButtonWrapper>
      <PaymentLayout>
        <Container title="결제수단 선택">
          <ButtonGroupWrapper>
            <Button size="lg" variant="success" onClick={handleCashPayment}>
              현금
            </Button>
            <Button size="lg" variant="success" onClick={handleCardPayment}>
              카드
            </Button>
          </ButtonGroupWrapper>
        </Container>
      </PaymentLayout>
    </Modal>
  )
}

export default Payment
