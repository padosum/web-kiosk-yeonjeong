import React, { useState } from 'react'
import { useKeyEscClose } from '../../hooks/useKeyEscClose'
import Badge from '../common/Badge'
import Button from '../common/Button'
import Container from '../common/Container'
import ItemImageContainer from '../common/ItemImageContainer'
import MenuDetailModal from './MenuDetailModal'

const MenuItem = ({ item, selectMenu, setSelectMenu, popular, step }) => {
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
        {popular && (
          <Badge variant="danger" icon={true} position="right">
            인기
          </Badge>
        )}
        <ItemImageContainer
          src={`images/${item.categoryId}.png`}
          alt="product"
          onError={handleImgError}
        ></ItemImageContainer>
        <Button
          onClick={() => onModalVisible(true)}
          size="sm"
          variant="primary"
          disabled={step === 'cash'}
        >
          {item.price.toLocaleString()}
        </Button>
      </Container>
      {modalVisible && (
        <MenuDetailModal
          menu={item}
          selectMenu={selectMenu}
          setSelectMenu={setSelectMenu}
          onModalVisible={onModalVisible}
        ></MenuDetailModal>
      )}
    </>
  )
}

export default MenuItem
