import React from 'react'
import styled from 'styled-components'
import Button from '../common/Button'
import Input from '../common/Input'

const CashLayoutStyle = styled.section`
  display: flex;
  flex-direction: column;
  grid-area: cash;
  justify-content: space-around;
  padding-top: 1rem;
`

const CashLayout = ({
  totalAmount,
  paymentAmount,
  step,
  setPaymentAmount,
  orderMenu,
}) => {
  const amountList = [100, 500, 1000, 10000]
  return (
    <CashLayoutStyle>
      <Input
        title="주문금액"
        value={totalAmount.toLocaleString()}
        color="white"
      ></Input>
      <Input title="투입금액" value={paymentAmount} color="white"></Input>
      {amountList.map((amount) => {
        return (
          <Button
            size="lg"
            variant="normal"
            data-amount={amount}
            disabled={step !== 'cash'}
            onClick={() =>
              setPaymentAmount((prevPaymentAmout) => prevPaymentAmout + amount)
            }
          >
            {amount.toLocaleString() + '원'}
          </Button>
        )
      })}
      <Button
        size="lg"
        variant="warning"
        disabled={step !== 'cash' || totalAmount > paymentAmount}
        onClick={() => orderMenu({ id: 1, title: '현금' })}
      >
        현금 결제하기
      </Button>
    </CashLayoutStyle>
  )
}

export default CashLayout
