import React from 'react'
import styled, { css } from 'styled-components'

const VARIANTS = {
  normal: css`
    --badge-text-color: #fff;
    --badge-bg-color: #212529;
  `,
  primary: css`
    --badge-text-color: #fff;
    --badge-bg-color: #212529;
  `,
  success: css`
    --badge-text-color: #fff;
    --badge-bg-color: #92cd41;
  `,
  warning: css`
    --badge-text-color: #212529;
    --badge-bg-color: #f7d51d;
  `,
  danger: css`
    --badge-text-color: #fff;
    --badge-bg-color: #e76e55;
  `,
}

const BadgeStyle = styled.span`
  ${(p) => p.variantStyle}
  ${(props) => props.icon} {
    width: 100%;
  }
  ${(props) => !props.icon} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;

    color: var(--badge-text-color);
    text-align: center;
    background-color: var(--badge-bg-color);
    position: absolute;
    ${(props) => props.position === 'left'} {
      top: -2.5rem;
      right: -1rem;
    }
    ${(props) => props.position === 'right'} {
      top: -0.5rem;
      left: -1rem;
    }
    height: 1.5rem;
    z-index: 2;
  }
  font-size: 1.25rem;
  color: var(--badge-text-color);
  text-align: center;
  background-color: var(--badge-bg-color);
  box-shadow: 0 0.5em var(--badge-bg-color), 0 -0.5em var(--badge-bg-color),
    0.5em 0 var(--badge-bg-color), -0.5em 0 var(--badge-bg-color);
`

const Badge = ({ variant, children, icon, position }) => {
  const variantStyle = VARIANTS[variant]
  return (
    <BadgeStyle variantStyle={variantStyle} icon={icon} position={position}>
      {children}
    </BadgeStyle>
  )
}

export default Badge
