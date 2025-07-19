import { useEffect, useState } from 'react'
import { getEstimatedExitTransactionCost } from '../modules/mana/utils'

export const useWithdrawalCost = (): [string | null, boolean] => {
  const [cost, setCost] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancel = false
    const calculateCost = async () => {
      try {
        const cost = await getEstimatedExitTransactionCost()
        if (!cancel) {
          setCost(cost)
        }
      } catch (error) {
        console.error(error)
      } finally {
        if (!cancel) {
          setIsLoading(false)
        }
      }
    }
    calculateCost()
    return () => {
      cancel = true
    }
  }, [])

  return [cost, isLoading]
}
