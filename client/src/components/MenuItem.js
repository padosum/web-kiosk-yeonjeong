import React, { useState } from 'react'
import styled from 'styled-components'
import { useKeyEscClose } from '../hooks/useKeyEscClose'
import Button from './Button'
import Container from './Container'
import MenuDetailModal from './MenuDetailModal'

const ItemImage = styled.img`
  object-fit: scale-down;
  width: 100%;
  height: 100%;
`
const PopularItem = styled.span`
  background-color: #e76e55;
  padding: 0.25rem;
  color: #fff;
`
const MenuItem = ({ item, onSelectMenu, popular }) => {
  const [modalVisible, setModalVisible] = useState(false)

  useKeyEscClose(() => onModalVisible(false))

  const onModalVisible = (active) => {
    setModalVisible(active)
  }

  const handleImgError = (e) => {
    e.target.src = 'images/1.png'
  }

  return (
    <>
      <Container title={item.title}>
        {popular && <PopularItem>🌟 인기</PopularItem>}
        <ItemImage
          src={`images/${item.categoryId}.png`}
          alt="product"
          onError={handleImgError}
        ></ItemImage>
        <Button
          onClick={() => onModalVisible(true)}
          size="sm"
          variant="primary"
        >
          {item.price.toLocaleString()}
        </Button>
      </Container>
      {modalVisible && (
        <MenuDetailModal
          menu={item}
          onModalVisible={onModalVisible}
          onSelectMenu={onSelectMenu}
        ></MenuDetailModal>
      )}
    </>
  )
}

export default MenuItem
