import { useCallback } from 'react'

import useSortSearch from '../hooks/use-sort-search'

export default function SortSearchHeader() {
  const { sorter, reverse, setSorter, setReverse } = useSortSearch()

  const sort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorter(e.target.value)
    setReverse(false)
  }, [])

  const sortOptions = ['id', 'name']

  return (
    <div>
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
    </div>
  )
}
