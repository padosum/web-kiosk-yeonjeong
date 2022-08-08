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
  width: 60rem;
  padding: 2rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem;
`

const CloseButton = styled.button`
  font-size: 1.5rem;
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
  justify-content: space-between;
`

const PriceLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.5rem;
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
const handleImgError = (e) => {
  e.target.src = 'images/1.png'
}

const MenuDetailModal = ({ menu, onModalVisible, onSelectMenu }) => {
  const [quantity, setQuantity] = useState(1)

  const options = menu.optionId.reduce((acc, curr, idx) => {
    const detailId = menu.optionDetailId[idx]
    const optionTitle = menu.optionTitle[idx]
    const optionSurcharge = menu.optionSurcharge[idx]
    if (acc[curr]) {
      acc[curr]['detailId'].push(detailId)
      acc[curr]['optionTitle'].push(optionTitle)
      acc[curr]['optionSurcharge'].push(optionSurcharge)
    } else {
      acc = {
        ...acc,
        [curr]: {
          detailId: [detailId],
          optionTitle: [optionTitle],
          optionSurcharge: [optionSurcharge],
        },
      }
    }
    return acc
  }, {})

  let initOption = {}
  let initSurcharge = 0
  Object.keys(options).forEach((optionId) => {
    initSurcharge += options[optionId].optionSurcharge[0]
    initOption = {
      ...initOption,
      [optionId]: {
        id: options[optionId].detailId[0],
        title: options[optionId].optionTitle[0],
        surcharge: options[optionId].optionSurcharge[0],
      },
    }
  })

  const [option, setOption] = useState(initOption)
  const [price, setPrice] = useState(menu.price + initSurcharge)

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
    let optionSurcharge = []
    Object.values(option).forEach((item) => {
      optionId.push(item.id)
      optionTitle.push(item.title)
      optionSurcharge.push(item.surcharge)
    })

    onSelectMenu({
      title: menu.title,
      price,
      categoryId: menu.categoryId,
      menuId: menu.menuId,
      optionId: optionId.join(','),
      optionTitle: optionTitle.join(','),
      optionSurcharge: optionSurcharge.join(','),
      quantity,
    })
  }

  const handleChangeOption = (e) => {
    const {
      name,
      value,
      dataset: { title, surcharge },
    } = e.target

    const prevSurcharge = option[name].surcharge
    const currentSurcharge = Number(surcharge)
    setOption({
      ...option,
      [name]: {
        id: Number(value),
        title: title,
        surcharge: currentSurcharge,
      },
    })

    setPrice((prevPrice) => prevPrice - prevSurcharge + currentSurcharge)
  }

  const handleOverlayClick = (e) => {
    e.preventDefault()
    onModalVisible(false)
  }

  return (
    <Modal onClick={handleOverlayClick}>
      <ButtonWrapper>
        <CloseButton onClick={() => onModalVisible(false)}>X</CloseButton>
      </ButtonWrapper>

      <DetailLayout>
        <Container title={menu.title}>
          <ItemImage
            src={`images/${menu.categoryId}.png`}
            alt="item"
            onError={handleImgError}
          ></ItemImage>
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
                          data-surcharge={options[id].optionSurcharge[index]}
                        ></RadioButton>
                        <RadioButtonLabel>
                          {options[id].optionTitle[index]}{' '}
                          {options[id].optionSurcharge[index] > 0 &&
                            `+${options[id].optionSurcharge[index]}`}
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
          <PriceLayout>
            <span>총 금액 (원)</span>
            <Input value={price.toLocaleString()}></Input>
          </PriceLayout>
          {/* <Button
            onClick={() => onModalVisible(false)}
            size="lg"
            variant="normal"
          >
            창 닫기
          </Button> */}
          <Button onClick={() => onSubmitBtn()} size="lg" variant="danger">
            상품 담기
          </Button>
        </FooterLayout>
      </DetailLayout>
    </Modal>
  )
}
export default MenuDetailModal
