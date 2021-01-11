import { createContext, useContext, useState } from 'react'

import { Person } from '../types'

const SearchContext = createContext<Record<string, Function>>({})

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('')

  const searchState = {
    setSearch,
    search: (items: Person[]) =>
      [...items].filter((item) => {
        if (search === '') return true

        return Object.values(item.props).some((val: string) =>
          new RegExp(search, 'i').test(val)
        )
      }),
  }

  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  )
}

export default function useSearch() {
  return useContext(SearchContext)
}
