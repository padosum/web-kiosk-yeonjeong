import React from 'react'
import Modal from './Modal'
import Container from './Container'
import Button from './Button'
import styled from 'styled-components'

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

const Payment = ({ onHandleLoading, setStep, setPayment }) => {
  const handleCashPayment = () => {
    setStep('paying')
    setPayment({ id: 1, title: '현금' })
  }
  const handleCardPayment = () => {
    onHandleLoading()

    const min = 3
    const max = 7
    const rand = Math.floor(Math.random() * (max - min + 1) + min)
    setTimeout(() => {
      onHandleLoading()
      setStep('reciept')
      setPayment({ id: 2, title: '카드' })
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
