import { createContext, useContext, useState } from 'react'

import by from '../helpers/sort-by'

type SortSearchProps = Record<string, any>

const SortSearchContext = createContext<SortSearchProps>({})

export const SortSearchProvider = ({ children }) => {
  const [reverse, setReverse] = useState(false)
  const [sorter, setSorter] = useState<string>('id')

  const sortSearchState = {
    reverse,
    sorter,
    setReverse,
    setSorter,
    sort: (items: any[]) => [...items].sort(by(sorter, { reverse })),
  }

  return (
    <SortSearchContext.Provider value={sortSearchState}>
      {children}
    </SortSearchContext.Provider>
  )
}

export default function useSortSearch() {
  return useContext(SortSearchContext)
}
