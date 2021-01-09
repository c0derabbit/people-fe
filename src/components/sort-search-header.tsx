import { useCallback } from 'react'
import styled from 'styled-components'

import useSortSearch from '../hooks/use-sort-search'
import { gap } from '../styled'

export default function SortSearchHeader() {
  const { reverse, setSorter, setReverse } = useSortSearch()

  const sort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorter(e.target.value)
    setReverse(false)
  }, [])

  const sortOptions = ['id', 'name']

  return (
    <Header>
      <input type="text" placeholder="Search…" />
      <select
        onChange={sort}
      >
        {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <label>
        reverse
        <input
          type="checkbox"
          onChange={() => {
            setReverse(!reverse)
          }}
          checked={reverse}
        />
      </label>
    </Header>
  )
}

const Header = styled.div`
  padding: ${gap}px 0;
`
