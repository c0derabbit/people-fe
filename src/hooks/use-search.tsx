import { createContext, useContext, useState } from 'react'

type SearchProps = Record<string, any>

const SearchContext = createContext<SearchProps>({})

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('')

  const searchState = {
    setSearch,
    search: (items: any[]) => [...items].filter(item => {
      if (search === '') return true

      return Object.values(item.props)
        .some((val: string) => (new RegExp(search, 'i')).test(val))
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
