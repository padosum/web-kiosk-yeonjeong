import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../common/Button'
import Container from '../common/Container'
import Input from '../common/Input'

const MenuDetailOptions = ({
  menu,
  option,
  setOption,
  quantity,
  setQuantity,
  setPrice,
}) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
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

    setOptions(options)
    setOption(initOption)
    setPrice(menu.price + initSurcharge)
  }, [])
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

  const increase = () => {
    if (quantity < 50) {
      setQuantity((prevQuantity) => prevQuantity + 1)
    }
  }

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1)
    }
  }

  return (
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
  )
}

const OptionLayout = styled.div`
  grid-area: option;
`

const OptionWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  justify-content: space-around;
`

const Item = styled.label`
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
`

const RadioButtonLabel = styled.span`
  display: flex;
  align-items: center;
  padding: 0.375em 0.75em 0.375em 2.375em;
  border-radius: 99em;

  font-size: 1.625rem;
  ::before {
    position: absolute;
    display: flex;
    flex-shrink: 0;
    content: '';
    background-color: #fff;
    margin-right: 0.375em;
    transition: 0.25s linear;
  }
`

const RadioButton = styled.input`
  position: absolute;
  left: -9999px;
  &:checked + ${RadioButtonLabel} {
    animation: blink-effect 0.25s;
    ::before {
      position: absolute;
      transition: 0.25s linear;
      width: 2px;
      height: 2px;
      top: 0.5rem;
      left: 2rem;
      box-shadow: 2px 2px, 4px 2px, 2px 4px, 4px 4px, 6px 4px, 8px 4px, 2px 6px,
        4px 6px, 6px 6px, 8px 6px, 10px 6px, 2px 8px, 4px 8px, 6px 8px, 8px 8px,
        10px 8px, 12px 8px, 2px 10px, 4px 10px, 6px 10px, 8px 10px, 10px 10px,
        2px 12px, 4px 12px, 6px 12px, 8px 12px, 2px 14px, 4px 14px;
    }
  }

  @keyframes blink-effect {
    50% {
      opacity: 0;
    }
  }
`

const QuantityWrapper = styled.div`
  display: flex;
  margin-top: 1.25rem;
`

export default MenuDetailOptions
