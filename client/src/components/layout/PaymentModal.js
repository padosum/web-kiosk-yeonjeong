import React, { useState } from 'react'
import Modal from '../common/Modal'
import Container from '../common/Container'
import Button from '../common/Button'
import styled from 'styled-components'
import ConfirmModal from '../common/ConfirmModal'
import CloseButton from '../common/CloseButton'
import LoadingIndicator from '../common/LoadingIndicator'
import API from '../../util/api'

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

const BASE_URL = process.env.REACT_APP_API_HOST

const PaymentModal = ({ setStep, selectMenu, setPayment }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const totalAmount = selectMenu.reduce((acc, curr) => acc + curr.price, 0)

  const orderMenuByCard = async () => {
    const orderNum = await API.post(`${BASE_URL}/api/orders`, {
      paymentId: 2,
      paymentAmount: totalAmount,
      totalAmount,
      menu: [...selectMenu],
    })

    setPayment((prevPayment) => {
      return {
        ...prevPayment,
        orderNum,
      }
    })

    setStep('receipt')
  }

  const handleClickPayment = ({ id, title }) => {
    setPayment({
      id,
      title,
    })

    if (id === 1) {
      setStep('cash')
      return
    }

    setLoading(true)

    const MIN_SECONDS = 3
    const MAX_SECONDS = 7
    const rand = Math.floor(
      Math.random() * (MAX_SECONDS - MIN_SECONDS + 1) + MIN_SECONDS
    )
    setTimeout(() => {
      setLoading(false)
      orderMenuByCard()
    }, rand * 1000)
  }

  return (
    <>
      {loading && <LoadingIndicator title="결제 중입니다."></LoadingIndicator>}
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
              <Button
                size="lg"
                variant="success"
                onClick={() => handleClickPayment({ id: 1, title: '현금' })}
              >
                현금
              </Button>
              <Button
                size="lg"
                variant="success"
                onClick={() => handleClickPayment({ id: 2, title: '카드' })}
              >
                카드
              </Button>
            </ButtonGroupWrapper>
          </Container>
        </PaymentLayout>
      </Modal>
      {modalVisible && (
        <ConfirmModal
          title="결제를 취소하시겠습니까?"
          onCancel={() => setModalVisible(false)}
          onAccept={() => {
            setModalVisible(false)
            setStep('main')
          }}
        ></ConfirmModal>
      )}
    </>
  )
}

export default PaymentModal
