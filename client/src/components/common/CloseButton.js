import React from 'react'
import styled from 'styled-components'

const CloseButton = ({ onClick, children }) => {
  return <CloseButtonStyle onClick={onClick}>{children}</CloseButtonStyle>
}

const CloseButtonStyle = styled.button`
  font-size: 1.5rem;
`

export default CloseButton
