import React from 'react'
import styled from 'styled-components'

const ItemImageContainer = ({ src, alt, onError, children }) => {
  return (
    <ItemImage src={src} alt={alt} onError={onError}>
      {children}
    </ItemImage>
  )
}

const ItemImage = styled.img`
  object-fit: scale-down;
  width: 100%;
  height: 100%;
`

export default ItemImageContainer
