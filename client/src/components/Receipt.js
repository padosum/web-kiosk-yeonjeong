import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'
import Container from './Container'
import { useKeyEscClose } from '../hooks/useKeyEscClose'

const ReceiptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
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

const CloseButton = styled.button`
  font-size: 1.5rem;
`

const Receipt = ({
  orderNum,
  orderMenu,
  paymentId,
  paymentTitle,
  paymentAmount,
  totalAmount,
  setStep,
}) => {
  const changes = paymentAmount - totalAmount
  useKeyEscClose(() => setStep('main'))

  return (
    <Modal animation="pop">
      <ButtonWrapper>
        <CloseButton onClick={() => setStep('main')}>X</CloseButton>
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
        </Container>
      </ReceiptWrapper>
    </Modal>
  )
}

export default Receipt
