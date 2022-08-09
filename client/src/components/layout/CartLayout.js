import React from 'react'
import styled, { css } from 'styled-components'

import Container from '../common/Container'
import ItemImageContainer from '../common/ItemImageContainer'
import Badge from '../common/Badge'

const CartLayoutStyle = styled.section`
  display: flex;
  grid-area: cart;
  background-color: #484848;
  border-radius: 10px;
  border: 4px solid #353535;
  overflow: scroll;
  padding: 1rem;
  box-shadow: inset -4px -4px 0px 0px #353535;
  ${(props) =>
    props.step === 'cash' &&
    css`
      opacity: 0.6;
    `}
`

const SelectItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  flex: 0 0 150px;
  margin: 0 0.5rem;
  background-color: #fff;
  border-radius: 10px;
  border: 4px solid #353535;

  @keyframes drop {
    0% {
      transform: translateY(-30px) scaleY(0.9);
      opacity: 0;
    }
    5% {
      opacity: 0.7;
    }
    50% {
      transform: translateY(0px) scaleY(1);
      opacity: 1;
    }
    65% {
      transform: translateY(-17px) scaleY(0.9);
      opacity: 1;
    }
    75% {
      transform: translateY(-22px) scaleY(0.9);
      opacity: 1;
    }
    100% {
      transform: translateY(0px) scaleY(1);
      opacity: 1;
    }
  }

  opacity: 0;
  animation: drop 0.4s linear forwards 0.4s;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const OptionWrapper = styled.span`
  text-align: center;
  margin: 0.25rem;
  font-size: 1.25rem;
`

const CartLayout = ({ selectMenu, step, onClickRemoveMenu }) => {
  return (
    <CartLayoutStyle>
      {selectMenu.length > 0 &&
        selectMenu.map((item) => {
          return (
            <SelectItemWrapper key={item.menuId}>
              <ButtonWrapper>
                {step !== 'cash' && (
                  <button
                    onClick={() =>
                      onClickRemoveMenu(item.menuId, item.optionId)
                    }
                  >
                    X
                  </button>
                )}
              </ButtonWrapper>
              <Container title={item.title}>
                <ItemImageContainer
                  src={`images/${item.categoryId}.png`}
                  alt="product"
                ></ItemImageContainer>
                <Badge variant="normal" icon={false}>
                  {item.price.toLocaleString()}
                </Badge>
              </Container>
              <OptionWrapper>
                <p>{item.optionTitle.split(',').join('/')}</p>
                <p>수량: {item.quantity}개</p>
              </OptionWrapper>
            </SelectItemWrapper>
          )
        })}
    </CartLayoutStyle>
  )
}

export default CartLayout
