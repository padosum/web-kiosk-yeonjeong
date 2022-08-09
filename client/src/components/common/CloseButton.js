import React from 'react'
import styled from 'styled-components'

const CloseButtonStyle = styled.button`
  font-size: 1.5rem;
`

const CloseButton = ({ onClick, children }) => {
  return <CloseButtonStyle onClick={onClick}>{children}</CloseButtonStyle>
}

export default CloseButton
