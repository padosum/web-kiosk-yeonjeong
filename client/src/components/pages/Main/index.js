import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import API from '../../../util/api'
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

const BASE_URL = process.env.REACT_APP_API_HOST

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

  const paymentId = payment.id
  const paymentTitle = payment.title
  const orderNum = payment.orderNum
  const totalAmount = selectMenu.reduce((acc, curr) => acc + curr.price, 0)

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
    const orderNum = await API.post(`${BASE_URL}/api/orders`, {
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

    setStep('receipt')
  }

  return (
    <>
      <MenuItemsLayout>
        <Tabs
          step={step}
          setStep={setStep}
          onSelectMenu={handleSelectMenu}
        ></Tabs>
      </MenuItemsLayout>
      <CashLayout
        totalAmount={totalAmount}
        paymentAmount={paymentAmount}
        step={step}
        setPaymentAmount={setPaymentAmount}
        orderMenu={orderMenu}
      ></CashLayout>
      <CartLayout
        selectMenu={selectMenu}
        step={step}
        onClickRemoveMenu={handleRemoveMenu}
      ></CartLayout>
      <OrderLayout
        selectMenu={selectMenu}
        step={step}
        setStep={setStep}
        setSelectMenu={setSelectMenu}
      ></OrderLayout>
      {step === 'payment' && (
        <PaymentModal setStep={setStep} orderMenu={orderMenu}></PaymentModal>
      )}
      {step === 'receipt' && (
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
  )
}

export default Main
