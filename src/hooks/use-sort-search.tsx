import { createContext, useContext, useEffect, useState } from 'react'

import by from '../helpers/sort-by'
import { Person } from '../components/person-card'

type SortSearchProps = Record<string, any>

const SortSearchContext = createContext<SortSearchProps>({})

export const SortSearchProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [reverse, setReverse] = useState(false)
  const [sorter, setSorter] = useState<string>('id')
  const [sortedItems, setSortedItems] = useState(
    [...items].sort(by(sorter))
  )

  useEffect(() => {
    setSortedItems([...items].sort(by(sorter, { reverse })))
  }, [items, sorter, reverse])

  const sortSearchState = {
    items,
    setItems,
    reverse,
    sortedItems,
    setReverse,
    setSorter,
  }

  return (
    <SortSearchContext.Provider value={sortSearchState}>
      {children}
    </SortSearchContext.Provider>
  )
}

export default function useSortSearch(people: Person[]) {
  const { items, setItems, ...context } = useContext(SortSearchContext)

  useEffect(() => {
    if (items.length === 0) setItems(people)
  }, [])
  
  return context
}
