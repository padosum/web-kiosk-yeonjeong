import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useMenuApi from '../../hooks/useMenuApi'
import LoadingIndicator from '../common/LoadingIndicator'
import Tab from './Tab'
import TabPanel from './TabPanel'

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

const Tabs = ({ step, setStep, selectMenu, setSelectMenu }) => {
  const [menu, error, loading] = useMenuApi({ step })
  const [tabIndex, setTabIndex] = useState(0)

  const wrapperRef = useRef()
  const containerRef = useRef()
  let startX = useRef(0)
  let scrollLeft = useRef(0)
  let wait = useRef(false)
  let fps = useRef(50)
  let down = useRef(null)
  let up = useRef(null)

  const handleMouseDown = (e) => {
    startX.current = e.pageX
    scrollLeft.current = containerRef.current.scrollLeft

    up.current = null
    down.current = e.clientX

    e.target.style.cursor = 'grabbing'
  }

  const handleMouseUp = (e) => {
    e.target.style.cursor = 'grab'
  }

  const handleClick = (id) => {
    if (down.current !== up.current) {
      return
    }
    setTabIndex(id - 1)
  }

  useEffect(() => {
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
  }, [])

  if (error) {
    setStep('error')
    return null
  }

  if (loading) {
    return <LoadingIndicator title={'잠시 기다려 주세요'}></LoadingIndicator>
  }

  const menuByCategory = menu[tabIndex]?.menu
  return (
    <>
      <TabsWrapper ref={wrapperRef}>
        <TabsContainer
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {menu.map(({ id, title }) => {
            return (
              <Tab
                key={id}
                id={id}
                value={title}
                onClickTab={handleClick}
                active={id === tabIndex + 1}
              />
            )
          })}
        </TabsContainer>
      </TabsWrapper>
      <TabPanel
        step={step}
        menu={menuByCategory}
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      />
    </>
  )
}

export default Tabs
