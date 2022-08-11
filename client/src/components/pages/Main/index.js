import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Tabs from '../../layout/Tabs'
import PaymentModal from '../../layout/PaymentModal'
import Receipt from '../../layout/Receipt'
import CartLayout from '../../layout/CartLayout'
import CashLayout from '../../layout/CashLayout'
import OrderLayout from '../../layout/OrderLayout'

const MenuItemsLayout = styled.section`
  grid-area: items;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function Main() {
  const [step, setStep] = useState('main')
  const [payment, setPayment] = useState({})
  const [selectMenu, setSelectMenu] = useState([])
  const [paymentAmount, setPaymentAmount] = useState(0)

  useEffect(() => {
    if (step === 'main') {
      setSelectMenu([])
    }
  }, [step])

  if (step === 'error') {
    return <h1>오류가 발생했습니다.</h1>
  }

  return (
    <>
      <MenuItemsLayout>
        <Tabs
          step={step}
          setStep={setStep}
          selectMenu={selectMenu}
          setSelectMenu={setSelectMenu}
        ></Tabs>
      </MenuItemsLayout>
      <CashLayout
        step={step}
        setStep={setStep}
        selectMenu={selectMenu}
        setPayment={setPayment}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
      ></CashLayout>
      <CartLayout
        step={step}
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      ></CartLayout>
      <OrderLayout
        step={step}
        setStep={setStep}
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      ></OrderLayout>
      {step === 'payment' && (
        <PaymentModal
          setStep={setStep}
          selectMenu={selectMenu}
          setPayment={setPayment}
        ></PaymentModal>
      )}
      {step === 'receipt' && (
        <Receipt
          payment={payment}
          orderMenu={selectMenu}
          paymentAmount={paymentAmount}
          setStep={setStep}
        ></Receipt>
      )}
    </>
  )
}

export default Main
