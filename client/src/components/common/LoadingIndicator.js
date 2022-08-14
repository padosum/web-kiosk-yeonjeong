import React from 'react'
import styled from 'styled-components'

const LoadingIndicator = ({ title }) => {
  return (
    <LoadingIndicatorLayout>
      <LoadingIndicatorContainer>
        <LoadingIndicatorText>{title}</LoadingIndicatorText>
        <LoadingIndicatorTextBox></LoadingIndicatorTextBox>
        <LoadingIndicatorTextBox></LoadingIndicatorTextBox>
        <LoadingIndicatorTextBox></LoadingIndicatorTextBox>
      </LoadingIndicatorContainer>
      <LoadingIndicatorProgressBar>
        <Loading></Loading>
      </LoadingIndicatorProgressBar>
    </LoadingIndicatorLayout>
  )
}

const LoadingIndicatorLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2;
`

const LoadingIndicatorContainer = styled.div`
  width: 200px;
`

const LoadingIndicatorText = styled.p`
  font-size: 1.6rem;
  display: inline;
  color: white;
`

const LoadingIndicatorTextBox = styled.div`
  width: 5px;
  height: 5px;
  background-color: white;
  display: inline-block;
  margin-left: 0.5rem;
`

const LoadingIndicatorProgressBar = styled.div`
  position: relative;
  width: 200px;
  height: 36px;
  border: 5px solid #92cd41;
  margin: 10px auto;
  padding: 3px;
`

const Loading = styled.div`
  @keyframes loading-bar {
    from {
      width: 7px;
    }

    to {
      width: 184px;
      background-color: #92cd41;
    }
  }

  width: 7px;
  height: 20px;
  position: absolute;
  background-color: #76c442;
  display: inline-block;
  animation: loading-bar 1.5s infinite;
`

export default LoadingIndicator
