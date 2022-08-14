import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Badge from '../common/Badge'
import Button from '../common/Button'
import Input from '../common/Input'
import Container from '../common/Container'
import Modal from '../common/Modal'
import ItemImageContainer from '../common/ItemImageContainer'
import CloseButton from '../common/CloseButton'
import MenuDetailOptions from './MenuDetailOptions'

const handleImgError = (e) => {
  e.target.src = 'images/1.png'
}

const MenuDetailModal = ({
  menu,
  selectMenu,
  setSelectMenu,
  onModalVisible,
}) => {
  const [quantity, setQuantity] = useState(1)
  const [option, setOption] = useState({})
  const [price, setPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(price)

  useEffect(() => {
    setTotalPrice(price * quantity)
  }, [price, quantity])

  const addToCart = (menu) => {
    const addedMenu = [...selectMenu, menu]
    const newArrayOfMenu = addedMenu.reduce((acc, obj) => {
      let objectFound = acc.find(
        (arrItem) =>
          arrItem.menuId === obj.menuId &&
          arrItem.optionDetailId === obj.optionDetailId
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

  const onSubmitBtn = () => {
    onModalVisible(false)
    let optionId = []
    let optionTitle = []
    let optionSurcharge = []
    Object.values(option).forEach((item) => {
      optionId.push(item.id)
      optionTitle.push(item.title)
      optionSurcharge.push(item.surcharge)
    })

    addToCart({
      title: menu.title,
      price: totalPrice,
      categoryId: menu.categoryId,
      menuId: menu.menuId,
      optionDetailId: optionId.join(','),
      optionTitle: optionTitle.join(','),
      optionSurcharge: optionSurcharge.join(','),
      quantity,
    })
  }

  const handleOverlayClick = (e) => {
    e.preventDefault()

    onModalVisible(false)
  }

  return (
    <Modal onModalOverlayClick={handleOverlayClick}>
      <ButtonWrapper>
        <CloseButton onClick={() => onModalVisible(false)}>X</CloseButton>
      </ButtonWrapper>

      <DetailLayout>
        <Container title={menu.title}>
          <ItemImageContainer
            src={`images/${menu.categoryId}.png`}
            alt="product"
            onError={handleImgError}
          ></ItemImageContainer>
          <Badge variant="normal" icon={false}>
            {menu.price.toLocaleString()}
          </Badge>
        </Container>
        <MenuDetailOptions
          menu={menu}
          option={option}
          setOption={setOption}
          quantity={quantity}
          setQuantity={setQuantity}
          setPrice={setPrice}
        ></MenuDetailOptions>
        <FooterLayout>
          <PriceLayout>
            <span>총 금액 (원)</span>
            <Input value={totalPrice.toLocaleString()}></Input>
          </PriceLayout>
          <Button onClick={() => onSubmitBtn()} size="lg" variant="danger">
            상품 담기
          </Button>
        </FooterLayout>
      </DetailLayout>
    </Modal>
  )
}

const DetailLayout = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 150px auto;
  grid-template-rows: 2fr 1fr;
  grid-template-areas:
    'item option'
    'footer footer';
  width: 65rem;
  padding: 2rem;
  font-size: 1.5rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem;
`

const FooterLayout = styled.div`
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PriceLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.5rem;
`

export default MenuDetailModal
