import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import API from '../../../util/api'
import Tabs from '../../layout/Tabs'
import Container from '../../common/Container'
import Badge from '../../common/Badge'
import Button from '../../common/Button'
import Counter from '../../common/Counter'
import Payment from '../../layout/Payment'
import LoadingIndicator from '../../common/LoadingIndicator'
import Receipt from '../../layout/Receipt'
import Input from '../../common/Input'
import ItemImageContainer from '../../common/ItemImageContainer'

const ItemsLayout = styled.section`
  display: flex;
  grid-area: items;
  flex-direction: column;
  justify-content: center;
`
const CashLayout = styled.section`
  display: flex;
  flex-direction: column;
  grid-area: cash;
  justify-content: space-around;
  padding-top: 1rem;
`
const CartLayout = styled.section`
  display: flex;
  grid-area: cart;
  background-color: #484848;
  border-radius: 10px;
  border: 4px solid #353535;
  overflow: scroll;
  padding: 1rem;
  box-shadow: inset -4px -4px 0px 0px #353535;
  ${(props) =>
    props.step === 'cash' &&
    css`
      opacity: 0.6;
    `}
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
const SelectItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  flex: 0 0 150px;
  margin: 0 0.5rem;
  background-color: #fff;
  border-radius: 10px;
  border: 4px solid #353535;

  @keyframes drop {
    0% {
      transform: translateY(-30px) scaleY(0.9);
      opacity: 0;
    }
    5% {
      opacity: 0.7;
    }
    50% {
      transform: translateY(0px) scaleY(1);
      opacity: 1;
    }
    65% {
      transform: translateY(-17px) scaleY(0.9);
      opacity: 1;
    }
    75% {
      transform: translateY(-22px) scaleY(0.9);
      opacity: 1;
    }
    100% {
      transform: translateY(0px) scaleY(1);
      opacity: 1;
    }
  }

  opacity: 0;
  animation: drop 0.4s linear forwards 0.4s;
`

const OptionWrapper = styled.span`
  text-align: center;
  margin: 0.25rem;
  font-size: 1.25rem;
`
const PaymentLayout = styled.section`
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

function Main() {
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)

  const [selectMenu, setSelectMenu] = useState([])
  const [errorMessage, setErrorMessge] = useState('')
  const [step, setStep] = useState('main')
  const [payment, setPayment] = useState({})
  const [paymentAmount, setPaymentAmount] = useState(0)
  const paymentId = payment.id
  const paymentTitle = payment.title
  const orderNum = payment.orderNum
  const totalAmount = selectMenu.reduce((acc, curr) => acc + curr.price, 0)

  const handleLoading = () => {
    setLoading((prevLoading) => !prevLoading)
  }

  const handleClickPayment = () => {
    setStep('payment')
  }

  const handleClearMenu = () => {
    setSelectMenu([])
  }

  const handleRemoveMenu = (menuId, optionId) => {
    const filterMenu = selectMenu.filter((menu) => {
      return !(menu.menuId === menuId && menu.optionId === optionId)
    })
    setSelectMenu(filterMenu)
  }

  const handleSelectMenu = (menu) => {
    const addedMenu = [...selectMenu, menu]
    const newArrayOfMenu = addedMenu.reduce((acc, obj) => {
      let objectFound = acc.find(
        (arrItem) =>
          arrItem.menuId === obj.menuId && arrItem.optionId === obj.optionId
      )
      if (objectFound) {
        objectFound.quantity = objectFound.quantity + obj.quantity
      } else {
        acc.push(obj)
      }

      return acc
    }, [])

    setSelectMenu(newArrayOfMenu)
  }

  const orderMenu = async ({ id, title }) => {
    const orderNum = await API.post('/api/orders', {
      paymentId: id,
      paymentAmount: id === 1 ? paymentAmount : totalAmount,
      totalAmount,
      menu: [...selectMenu],
    })

    setPayment({
      id,
      title,
      orderNum,
    })

    setStep('reciept')

    const data = await fetchMenu()
    setMenu(data)
  }
  const handleSubmitOrder = async ({ id, title }) => {
    if (id === 1) {
      setStep('cash')
    } else {
      orderMenu({ id, title })
    }
  }
  const fetchMenu = () => {
    return API.get(`/api/menu`)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMenu()
        setMenu(data)
      } catch (err) {
        setMenu(null)
        setErrorMessge(err.message)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <>
      {loading && (
        <LoadingIndicator
          title={step === 'payment' ? '카드 결제 중' : '잠시 기다려 주세요'}
        ></LoadingIndicator>
      )}
      {menu ? (
        <>
          <ItemsLayout>
            <Tabs menu={menu} handleSelectMenu={handleSelectMenu}></Tabs>
          </ItemsLayout>
          <CashLayout>
            <Input
              title="주문금액"
              value={totalAmount.toLocaleString()}
              color="white"
            ></Input>
            <Input title="투입금액" value={paymentAmount} color="white"></Input>
            <Button
              size="lg"
              variant="normal"
              data-amount={100}
              disabled={step !== 'cash'}
              onClick={() =>
                setPaymentAmount((prevPaymentAmout) => prevPaymentAmout + 100)
              }
            >
              100원
            </Button>
            <Button
              size="lg"
              variant="normal"
              data-amount={500}
              disabled={step !== 'cash'}
              onClick={() =>
                setPaymentAmount((prevPaymentAmout) => prevPaymentAmout + 500)
              }
            >
              500원
            </Button>

            <Button
              size="lg"
              variant="normal"
              data-amount={1000}
              disabled={step !== 'cash'}
              onClick={() =>
                setPaymentAmount((prevPaymentAmout) => prevPaymentAmout + 1000)
              }
            >
              1,000원
            </Button>
            <Button
              size="lg"
              variant="normal"
              data-amount={10000}
              disabled={step !== 'cash'}
              onClick={() =>
                setPaymentAmount((prevPaymentAmout) => prevPaymentAmout + 10000)
              }
            >
              10,000원
            </Button>
            <Button
              size="lg"
              variant="warning"
              disabled={step !== 'cash' || totalAmount > paymentAmount}
              onClick={() => orderMenu({ id: 1, title: '현금' })}
            >
              현금 결제하기
            </Button>
          </CashLayout>
          <CartLayout step={step}>
            {selectMenu.length > 0 &&
              selectMenu.map((item) => {
                return (
                  <SelectItemWrapper key={item.menuId}>
                    <ButtonWrapper>
                      {step !== 'cash' && (
                        <button
                          onClick={() =>
                            handleRemoveMenu(item.menuId, item.optionId)
                          }
                        >
                          X
                        </button>
                      )}
                    </ButtonWrapper>
                    <Container title={item.title}>
                      <ItemImageContainer
                        src={`images/${item.categoryId}.png`}
                        alt="product"
                      ></ItemImageContainer>
                      <Badge variant="normal" icon={false}>
                        {item.price.toLocaleString()}
                      </Badge>
                    </Container>
                    <OptionWrapper>
                      <p>{item.optionTitle.split(',').join('/')}</p>
                      <p>수량: {item.quantity}개</p>
                    </OptionWrapper>
                  </SelectItemWrapper>
                )
              })}
          </CartLayout>
          <PaymentLayout>
            {selectMenu.length > 0 && step === 'main' && (
              <>
                <TimerWrapper>
                  <TimerLabel>남은 시간</TimerLabel>
                  <Counter
                    onHandleCount={handleClearMenu}
                    stop={step !== 'main'}
                  ></Counter>
                </TimerWrapper>
                <Button size="lg" variant="normal" onClick={handleClearMenu}>
                  전체 취소
                </Button>
                <Button
                  size="lg"
                  variant="success"
                  onClick={handleClickPayment}
                >
                  결제하기
                </Button>
              </>
            )}
          </PaymentLayout>
          {step === 'payment' && (
            <Payment
              onHandleLoading={handleLoading}
              onHandleSubmit={handleSubmitOrder}
              onHandleClearMenu={handleClearMenu}
              setStep={setStep}
            ></Payment>
          )}
          {step === 'reciept' && (
            <Receipt
              orderNum={orderNum}
              orderMenu={selectMenu}
              paymentId={paymentId}
              paymentTitle={paymentTitle}
              paymentAmount={paymentAmount}
              totalAmount={totalAmount}
              setStep={setStep}
            ></Receipt>
          )}
        </>
      ) : (
        <div>{errorMessage}</div>
      )}
    </>
  )
}

export default Main
