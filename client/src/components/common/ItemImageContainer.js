import React from 'react'
import styled from 'styled-components'

const ItemImage = styled.img`
  object-fit: scale-down;
  width: 100%;
  height: 100%;
`

const ItemImageContainer = ({ src, alt, onError, children }) => {
  return (
    <ItemImage src={src} alt={alt} onError={onError}>
      {children}
    </ItemImage>
  )
}

export default ItemImageContainer
