import React from 'react'
import styled from 'styled-components'

const InputLabel = styled.label`
  font-size: 1.5rem;
  color: ${(props) => props.color || 'black'};
`
const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 1.125rem;
  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: none;
  }

  ::before {
    top: -4px;
    bottom: -4px;
    border-top: 4px solid black;
    border-bottom: 4px solid black;
  }

  ::after {
    left: -4px;
    right: -4px;
    border-left: 4px solid black;
    border-right: 4px solid black;
  }
`
const InputStyle = styled.input`
  display: block;
  padding: 8px 12px;
  border: none;
  background-color: #f8f8f8;
  text-align: center;
  font-size: 1.5rem;
`
const Input = ({ title = '', value, color }) => {
  return (
    <>
      {title !== '' && (
        <InputLabel htmlFor={title} color={color}>
          {title}
        </InputLabel>
      )}
      <InputWrapper>
        <InputStyle
          id={title}
          deafultValue="1"
          value={value}
          readOnly={true}
        ></InputStyle>
      </InputWrapper>
    </>
  )
}

export default Input
