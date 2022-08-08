import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Tab from './Tab'
import API from '../util/api'
import TabPanel from './TabPanel'
import Container from './Container'
import Badge from './Badge'
import Button from './Button'
import Counter from './Counter'

const ItemsLayout = styled.section`
  display: flex;
  grid-area: items;
  flex-direction: column;
  justify-content: center;
`
const CashLayout = styled.section`
  display: flex;
  grid-area: cash;
`
const CartLayout = styled.section`
  display: flex;
  grid-area: cart;
  background-color: #484848;
  border-radius: 10px;
  border: 4px solid #353535;
  overflow: scroll;
  padding: 1rem;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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
const ItemImage = styled.img`
  object-fit: scale-down;
  width: 100%;
  height: 100%;
`
const OptionWrapper = styled.span`
  text-align: center;
  margin: 0.25rem;
  font-size: 1.25rem;
`
const PaymentLayout = styled.section`
  display: flex;
  flex-direction: column;
  grid-area: payment;
  justify-content: space-between;
`
const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const TimerLabel = styled.label`
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`
const TabsWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 5rem;
  display: flex;
  overflow: auto;
  background-color: #f8f8f8;
  border-radius: 10px;
  border: 4px solid #353535;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  box-shadow: inset -4px -4px 0px 0px #adafbc;
`
const TabsContainer = styled.ul`
  display: flex;
  width: 100%;
  white-space: nowrap;
  overflow: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

function Main() {
  const wrapperRef = React.useRef()
  const containerRef = React.useRef()
  let startX = useRef(0)
  let scrollLeft = useRef(0)
  let wait = useRef(false)
  let fps = useRef(50)
  let down = useRef(null)
  let up = useRef(null)

  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tabIndex, setTabIndex] = useState(0)
  const [selectMenu, setSelectMenu] = useState([])
  const [errorMessage, setErrorMessge] = useState('')
  const [step, setStep] = useState(0) // 결제 후 변경 필요

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handleClearMenu = () => {
    setSelectMenu([])
  }

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

  const fetchMenu = () => {
    return API.get(`/api/menu`)
  }

  React.useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      if (!startX.current || wait.current) return
      wait.current = true //throttle
      setTimeout(() => (wait.current = false), 1000 / fps.current)
      const offset = e.pageX
      containerRef.current.scrollLeft =
        scrollLeft.current + startX.current - offset
    })

    document.addEventListener('mouseup', (e) => {
      startX.current = 0
      up.current = e.clientX
      containerRef.current.style.cursor = 'grab'
    })

    const getData = async () => {
      try {
        const data = await fetchMenu()
        setMenu(data)
      } catch (err) {
        setMenu(null)
        setErrorMessge(err.message)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  const handleMouseDown = (e) => {
    startX.current = e.pageX
    scrollLeft.current = containerRef.current.scrollLeft

    up.current = null
    down.current = e.clientX

    e.target.style.cursor = 'grabbing'
  }

  const handleClick = (id) => {
    if (down.current !== up.current) {
      return
    }
    setTabIndex(id - 1)
  }

  return (
    <>
      {loading && <div>로딩중...</div>}
      {menu ? (
        <>
          <ItemsLayout>
            <TabsWrapper ref={wrapperRef}>
              <TabsContainer ref={containerRef} onMouseDown={handleMouseDown}>
                {menu.map(({ id, title }) => {
                  return (
                    <Tab
                      key={id}
                      id={id}
                      value={title}
                      clickTab={handleClick}
                      active={id === tabIndex + 1}
                    />
                  )
                })}
              </TabsContainer>
            </TabsWrapper>
            <TabPanel
              menu={menu[tabIndex]?.menu}
              onSelectMenu={handleSelectMenu}
            />
          </ItemsLayout>
          <CashLayout>결제방식</CashLayout>
          <CartLayout>
            {selectMenu.length > 0 &&
              selectMenu.map((item) => {
                return (
                  <SelectItemWrapper key={item.menuId}>
                    <ButtonWrapper>
                      <button
                        onClick={() =>
                          handleRemoveMenu(item.menuId, item.optionId)
                        }
                      >
                        X
                      </button>
                    </ButtonWrapper>
                    <Container title={item.title}>
                      <ItemImage
                        src="images/1.png"
                        alt="product item"
                      ></ItemImage>
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
          </CartLayout>
          <PaymentLayout>
            {selectMenu.length > 0 && (
              <>
                <TimerWrapper>
                  <TimerLabel>남은 시간:</TimerLabel>
                  <Counter
                    onHandleCount={handleClearMenu}
                    stop={step}
                  ></Counter>
                </TimerWrapper>
                <Button size="lg" variant="normal" onClick={handleClearMenu}>
                  전체 취소
                </Button>
                <Button size="lg" variant="success" onClick={handleNextStep}>
                  결제하기
                </Button>
              </>
            )}
          </PaymentLayout>
        </>
      ) : (
        <div>{errorMessage}</div>
      )}
    </>
  )
}

export default Main
