import React from 'react'
import styled, { css } from 'styled-components'

const SIZES = {
  sm: css`
    --button-font-size: 1.5rem;
    --button-padding: 8px 12px;
  `,
  md: css`
    --button-font-size: 1.625rem;
    --button-padding: 12px 16px;
  `,
  lg: css`
    --button-font-size: 1.75rem;
    --button-padding: 16px 20px;
  `,
}
const VARIANTS = {
  normal: css`
    --button-text-color: #212529;
    --button-bg-color: #fff;
    --button-shadow-color: #adafbc;
    --button-hover-color: #e7e7e7;
  `,
  primary: css`
    --button-text-color: #fff;
    --button-bg-color: #209cee;
    --button-shadow-color: #006bb3;
    --button-hover-color: #108de0;
  `,
  success: css`
    --button-text-color: #fff;
    --button-bg-color: #92cd41;
    --button-shadow-color: #4aa52e;
    --button-hover-color: #76c442;
  `,
  warning: css`
    --button-text-color: #212529;
    --button-bg-color: #f7d51d;
    --button-shadow-color: #e59400;
    --button-hover-color: #f2c409;
  `,
  danger: css`
    --button-text-color: #fff;
    --button-bg-color: #e76e55;
    --button-shadow-color: #8c2022;
    --button-hover-color: #ce372b;
  `,
}

const ButtonStyle = styled.button`
  ${(p) => p.sizeStyle}
  ${(p) => p.variantStyle}
  min-width: 7rem;
  background: var(--button-bg-color);
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: var(--button-font-size);
  padding: var(--button-padding);
  text-decoration: none;
  color: var(--button-text-color);
  box-shadow: inset -4px -4px 0px 0px var(--button-shadow-color);
  ${({ disabled }) => disabled && 'opacity: 0.6;'}

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    top: -6px;
    left: 0;
    border-top: 6px black solid;
    border-bottom: 6px black solid;
  }
  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    left: -6px;
    top: 0;
    border-left: 6px black solid;
    border-right: 6px black solid;
  }

  ${(props) =>
    !props.disabled &&
    css`
      &:hover,
      &:focus {
        background: var(--button-hover-color);
        box-shadow: inset -6px -6px 0px 0px var(--button-shadow-color);
      }

      &:active {
        box-shadow: inset 4px 4px 0px 0px var(--button-shadow-color);
      }
    `}
`
const Button = ({ size, variant, disabled = false, onClick, children }) => {
  const sizeStyle = SIZES[size]
  const variantStyle = VARIANTS[variant]

  return (
    <ButtonStyle
      onClick={onClick}
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
      disabled={disabled}
    >
      {children}
    </ButtonStyle>
  )
}

export default Button
