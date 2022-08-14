import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from '../common/Modal'
import Container from '../common/Container'
import CloseButton from '../common/CloseButton'
import { useKeyEscClose } from '../../hooks/useKeyEscClose'

const Receipt = ({ payment, orderMenu, paymentAmount, setStep }) => {
  const [counter, setCounter] = useState(10)
  const handleNextStep = () => {
    setStep('main')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1)
      } else {
        clearInterval(interval)
        handleNextStep()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [counter])

  useKeyEscClose(() => handleNextStep)

  const totalAmount = orderMenu.reduce((acc, curr) => acc + curr.price, 0)
  const changes = paymentAmount - totalAmount
  const { orderNum, id: paymentId, title: paymentTitle } = payment
  return (
    <Modal animation="pop">
      <ButtonWrapper>
        <CloseButton onClick={handleNextStep}>X</CloseButton>
      </ButtonWrapper>
      <ReceiptWrapper>
        <Container title={`주문번호 ${orderNum}`}>
          <MenuWrapper>
            {orderMenu.map((item) => {
              const title = `${item.title} ${item.quantity}개`
              const optionName = `(${item.optionTitle.split(',').join('/')})`
              return (
                <Item key={item.menuId}>
                  {title} <ItemOption>{optionName}</ItemOption>
                </Item>
              )
            })}
          </MenuWrapper>
          <PaymentWrapper>
            <p>결제방식: {paymentTitle}</p>
            {paymentId === 1 && (
              <p>투입금액: {paymentAmount.toLocaleString()}</p>
            )}
            <p>총 결제금액: {totalAmount.toLocaleString()}</p>
            {changes > 0 && paymentId === 1 && (
              <p>잔돈: {changes.toLocaleString()}</p>
            )}
          </PaymentWrapper>
          <MessageWrapper>
            이 화면은 {counter}초 후 자동으로 사라집니다.
          </MessageWrapper>
        </Container>
      </ReceiptWrapper>
    </Modal>
  )
}

const ReceiptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 42rem;
  padding: 4rem;
  background-color: #fff;
  padding: 1rem;
  font-size: 1.8rem;
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 20rem;
  flex-grow: 1;
`

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-top: 4px dotted #000;
`
const Item = styled.p`
  margin-bottom: 1rem;
  word-break: keep-all;
`
const ItemOption = styled.span`
  font-size: 1.5rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.25rem 0 1.25rem;
`

const MessageWrapper = styled.div`
  width: 100%;
  padding-top: 1rem;
  border-top: 4px dotted #000;
  word-break: keep-all;
  text-align: center;
`

export default Receipt
