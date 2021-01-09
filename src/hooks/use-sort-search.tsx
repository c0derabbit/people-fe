import { createContext, useContext, useState } from 'react'

import by from '../helpers/sort-by'

type SortSearchProps = Record<string, any>

const SortSearchContext = createContext<SortSearchProps>({})

export const SortSearchProvider = ({ children }) => {
  const [reverse, setReverse] = useState(false)
  const [sorter, setSorter] = useState<string>('id')
  const [search, setSearch] = useState('')

  const sortSearchState = {
    reverse,
    sorter,
    setReverse,
    setSorter,
    setSearch,
    sort: (items: any[]) => [...items].sort(by(sorter, { reverse })),
    filter: (items: any[]) => [...items].filter(item => {
      if (search === '') return true

      return Object.values(item.props)
        .some((val: string) => (new RegExp(search, 'i')).test(val))
    }),
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
