import { useCallback, useState } from 'react'
import API from '../util/api'

const BASE_URL = process.env.REACT_APP_API_HOST

const useOrdersApi = ({
  paymentId,
  paymentAmount,
  totalAmount,
  selectMenu,
}) => {
  const [orderNum, setOrderNum] = useState(0)
  const [error, setError] = useState(false)

  const createOrders = useCallback(async () => {
    try {
      const orderNum = await API.post(`${BASE_URL}/api/orders`, {
        paymentId,
        paymentAmount: paymentId === 1 ? paymentAmount : totalAmount,
        totalAmount,
        menu: [...selectMenu],
      })
      setOrderNum(orderNum)
    } catch (err) {
      setError(true)
    }
  }, [paymentId, paymentAmount, totalAmount, selectMenu])

  return [orderNum, error, setError, createOrders]
}

export default useOrdersApi
