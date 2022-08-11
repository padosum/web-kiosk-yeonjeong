import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Tabs from '../../layout/Tabs'
import PaymentModal from '../../layout/PaymentModal'
import Receipt from '../../layout/Receipt'
import CartLayout from '../../layout/CartLayout'
import CashLayout from '../../layout/CashLayout'
import OrderLayout from '../../layout/OrderLayout'

const MenuItemsLayout = styled.section`
  display: flex;
  grid-area: items;
  flex-direction: column;
  justify-content: center;
`

function Main() {
  const [selectMenu, setSelectMenu] = useState([])
  const [step, setStep] = useState('main')
  const [payment, setPayment] = useState({})
  const [paymentAmount, setPaymentAmount] = useState(0)

  useEffect(() => {
    if (step === 'main') {
      setSelectMenu([])
    }
  }, [step])

  if (step === 'error') {
    return <h1>오류가 발생했습니다.</h1>
  }

  const totalAmount = selectMenu.reduce((acc, curr) => acc + curr.price, 0)

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
        totalAmount={totalAmount}
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
          totalAmount={totalAmount}
        ></PaymentModal>
      )}
      {step === 'receipt' && (
        <Receipt
          payment={payment}
          orderMenu={selectMenu}
          paymentAmount={paymentAmount}
          totalAmount={totalAmount}
          setStep={setStep}
        ></Receipt>
      )}
    </>
  )
}

export default Main
