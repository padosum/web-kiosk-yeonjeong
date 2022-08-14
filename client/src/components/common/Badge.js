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

const Badge = ({ variant, children, icon, position }) => {
  const variantStyle = VARIANTS[variant]
  return (
    <BadgeStyle variantStyle={variantStyle} icon={icon} position={position}>
      {children}
    </BadgeStyle>
  )
}

const BadgeStyle = styled.span`
  ${(p) => p.variantStyle}

  ${(props) =>
    !props.icon &&
    css`
      width: 100%;
    `}

    ${(props) =>
    props.icon &&
    css`
      position: absolute;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    `}

    ${(props) =>
    props.position === 'left' &&
    css`
      top: 1rem;
      left: -1rem;
    `}

    ${(props) =>
    props.position === 'right' &&
    css`
      top: 1rem;
      right: 1rem;
    `}

  font-size: 1.25rem;
  color: var(--badge-text-color);
  text-align: center;
  background-color: var(--badge-bg-color);
  box-shadow: 0 0.5em var(--badge-bg-color), 0 -0.5em var(--badge-bg-color),
    0.5em 0 var(--badge-bg-color), -0.5em 0 var(--badge-bg-color);
`
export default Badge
