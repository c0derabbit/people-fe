import { useCallback } from 'react'
import { Button, Checkbox, Pane, SearchInput, SelectMenu } from 'evergreen-ui'

import useSortSearch from '../hooks/use-sort-search'

export default function SortSearchHeader() {
  const { sorter, reverse, setSorter, setReverse } = useSortSearch()

  const sort = useCallback((prop: any) => {
    setSorter(prop.value)
    setReverse(false)
  }, [])

  return (
    <Pane display="flex">
      <SearchInput placeholder="Search…" />
      <SelectMenu
        title="Sort"
        onSelect={sort}
        hasFilter={false}
        closeOnSelect
        options={['id', 'name'].map(label => ({ label, value: label }))}
      >
        <Button>{sorter ? `Sorted by ${sorter}` : 'Sort by…'}</Button>
      </SelectMenu>
      <Checkbox
        label="reverse"
        onChange={() => {
          setReverse(!reverse)
        }}
        checked={reverse}
      />
    </Pane>
  )
}
