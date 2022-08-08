import React, { useState } from 'react'
import styled from 'styled-components'
import Badge from './Badge'
import Button from './Button'
import Input from './Input'
import Container from './Container'
import Modal from './Modal'

const DetailLayout = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 150px auto;
  grid-template-rows: 2fr 1fr;
  grid-template-areas:
    'item option'
    'footer footer';
  width: 55rem;
  padding: 4rem;
`
const ItemImage = styled.img`
  object-fit: scale-down;
  width: 100%;
  height: 100%;
`
const OptionLayout = styled.div`
  grid-area: option;
`
const FooterLayout = styled.div`
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Item = styled.label`
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
  font-size: 1.25rem;
`
const RadioButtonLabel = styled.span`
  display: flex;
  align-items: center;
  padding: 0.375em 0.75em 0.375em 2.375em;
  border-radius: 99em;
  transition: 0.25s ease;
  ::before {
    position: absolute;
    display: flex;
    flex-shrink: 0;
    content: '';
    background-color: #fff;
    margin-right: 0.375em;
    transition: 0.25s ease;
  }
`
const RadioButton = styled.input`
  position: absolute;
  left: -9999px;
  &:checked + ${RadioButtonLabel} {
    ::before {
      position: absolute;
      transition: 0.25s ease;
      width: 2px;
      height: 2px;
      top: 0.1rem;
      left: 1rem;
      box-shadow: 2px 2px, 4px 2px, 2px 4px, 4px 4px, 6px 4px, 8px 4px, 2px 6px,
        4px 6px, 6px 6px, 8px 6px, 10px 6px, 2px 8px, 4px 8px, 6px 8px, 8px 8px,
        10px 8px, 12px 8px, 2px 10px, 4px 10px, 6px 10px, 8px 10px, 10px 10px,
        2px 12px, 4px 12px, 6px 12px, 8px 12px, 2px 14px, 4px 14px;
    }
  }
`
const QuantityWrapper = styled.div`
  margin-top: 1.25rem;
`

const MenuDetailModal = ({ menu, onModalVisible, onSelectMenu }) => {
  const [quantity, setQuantity] = useState(1)

  const options = menu.optionId.reduce((acc, curr, idx) => {
    const detailId = menu.optionDetailId[idx]
    const optionTitle = menu.optionTitle[idx]
    if (acc[curr]) {
      acc[curr]['detailId'].push(detailId)
      acc[curr]['optionTitle'].push(optionTitle)
    } else {
      acc = {
        ...acc,
        [curr]: {
          detailId: [detailId],
          optionTitle: [optionTitle],
        },
      }
    }
    return acc
  }, {})

  let initOption = {}
  Object.keys(options).forEach((optionId) => {
    initOption = {
      ...initOption,
      [optionId]: {
        id: options[optionId].detailId[0],
        title: options[optionId].optionTitle[0],
      },
    }
  })

  const [option, setOption] = useState(initOption)
  const increase = () => {
    if (quantity < 50) {
      setQuantity((quantity) => quantity + 1)
    }
  }

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1)
    }
  }

  const onSubmitBtn = () => {
    onModalVisible(false)
    let optionId = []
    let optionTitle = []
    Object.values(option).forEach((item) => {
      optionId.push(item.id)
      optionTitle.push(item.title)
    })

    onSelectMenu({
      title: menu.title,
      price: menu.price,
      menuId: menu.menuId,
      optionId: optionId.join(','),
      optionTitle: optionTitle.join(','),
      quantity,
    })
  }

  const handleChangeOption = (e) => {
    const {
      name,
      value,
      dataset: { title },
    } = e.target

    setOption({
      ...option,
      [name]: {
        id: Number(value),
        title: title,
      },
    })
  }

  const handleOverlayClick = (e) => {
    e.preventDefault()
    onModalVisible(false)
  }

  return (
    <Modal onClick={handleOverlayClick}>
      <DetailLayout>
        <Container title={menu.title}>
          <ItemImage src="images/1.png" alt="item"></ItemImage>
          <Badge variant="normal" icon={false}>
            {menu.price.toLocaleString()}
          </Badge>
        </Container>
        <OptionLayout>
          <Container title="옵션과 수량 선택">
            {Object.keys(options).map((id) => {
              return (
                <OptionWrapper key={id}>
                  {options[id].detailId.map((detailId, index) => {
                    return (
                      <Item key={detailId}>
                        <RadioButton
                          type="radio"
                          name={id}
                          value={detailId}
                          defaultChecked={index === 0}
                          onChange={handleChangeOption}
                          data-title={options[id].optionTitle[index]}
                        ></RadioButton>
                        <RadioButtonLabel>
                          {options[id].optionTitle[index]}
                        </RadioButtonLabel>
                      </Item>
                    )
                  })}
                </OptionWrapper>
              )
            })}

            <QuantityWrapper>
              <Button size="sm" variant="normal" onClick={decrease}>
                ➖
              </Button>
              <Input value={quantity} />
              <Button size="sm" variant="normal" onClick={increase}>
                ➕
              </Button>
            </QuantityWrapper>
          </Container>
        </OptionLayout>
        <FooterLayout>
          <Button
            onClick={() => onModalVisible(false)}
            size="lg"
            variant="normal"
          >
            창 닫기
          </Button>
          <Button onClick={() => onSubmitBtn()} size="lg" variant="danger">
            상품 담기
          </Button>
        </FooterLayout>
      </DetailLayout>
    </Modal>
  )
}
export default MenuDetailModal
