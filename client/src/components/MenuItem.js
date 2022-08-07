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
const MenuItem = (props) => {
  const { item, onSelectMenu } = props
  const [modalVisible, setModalVisible] = useState(false)

  useKeyEscClose(() => onModalVisible(false))

  const onModalVisible = (active) => {
    setModalVisible(active)
  }

  return (
    <>
      <Container title={item.title}>
        <ItemImage src={'images/1.png'}></ItemImage>
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
