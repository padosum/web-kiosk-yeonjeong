import React, { useState } from 'react'
import Modal from './Modal'
import Container from './Container'
import Button from './Button'
import styled from 'styled-components'
import ConfirmModal from './ConfirmModal'

const PaymentLayout = styled.div`
  width: 55rem;
  padding: 0 4rem 4rem 4rem;
  font-size: 2rem;
`

const ButtonGroupWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem;
`

const CloseButton = styled.button`
  font-size: 1.5rem;
`

const Payment = ({
  onHandleLoading,
  onHandleSubmit,
  onHandleClearMenu,
  setStep,
}) => {
  const [modalVisible, setModalVisible] = useState(false)

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
    <>
      <Modal>
        <ButtonWrapper>
          <CloseButton
            onClick={() => {
              setModalVisible(true)
            }}
          >
            X
          </CloseButton>
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
      {modalVisible && (
        <ConfirmModal
          title="결제를 취소하시겠습니까?"
          onHandleCancel={() => setModalVisible(false)}
          onHandleAccept={() => {
            setModalVisible(false)
            setStep('main')
            onHandleClearMenu()
          }}
        ></ConfirmModal>
      )}
    </>
  )
}

export default Payment
