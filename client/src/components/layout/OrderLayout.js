import React from 'react'
import styled from 'styled-components'

import Counter from '../common/Counter'
import Button from '../common/Button'

const OrderLayoutStyle = styled.section`
  display: flex;
  flex-direction: column;
  grid-area: payment;
  justify-content: space-around;
`

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const TimerLabel = styled.label`
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`

const OrderLayout = ({ selectMenu, step, setStep, setSelectMenu }) => {
  return (
    <OrderLayoutStyle>
      {selectMenu.length > 0 && step === 'main' && (
        <>
          <TimerWrapper>
            <TimerLabel>남은 시간</TimerLabel>
            <Counter
              onHandleTimeout={() => setSelectMenu([])}
              stop={step !== 'main'}
            ></Counter>
          </TimerWrapper>
          <Button size="lg" variant="normal" onClick={() => setSelectMenu([])}>
            전체 취소
          </Button>
          <Button
            size="lg"
            variant="success"
            onClick={() => setStep('payment')}
          >
            결제하기
          </Button>
        </>
      )}
    </OrderLayoutStyle>
  )
}

export default OrderLayout
