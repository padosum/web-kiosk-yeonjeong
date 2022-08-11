import { useEffect, useState } from 'react'
import API from '../util/api'

const BASE_URL = process.env.REACT_APP_API_HOST

const useMenuApi = ({ step }) => {
  const [menu, setMenu] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchMenu = () => {
    return API.get(`${BASE_URL}/api/menu`)
  }

  useEffect(() => {
    if (step === 'main') {
      const getData = async () => {
        setLoading(true)
        try {
          const data = await fetchMenu()
          setMenu(data)
        } catch (err) {
          setMenu(null)
          setError(true)
        } finally {
          setLoading(false)
        }
      }
      getData()
    }
  }, [step])

  return [menu, error, loading]
}

export default useMenuApi
