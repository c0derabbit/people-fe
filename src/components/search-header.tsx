import styled from 'styled-components'

import useSearch from '../hooks/use-search'
import { Field, gap } from '../styled'

export default function SearchHeader() {
  const { setSearch } = useSearch()

  return (
    <Header>
      <Field
        type="text"
        placeholder="Search…"
        onChange={(e) => setSearch(e.target.value)}
      />
    </Header>
  )
}

const Header = styled.div`
  padding: ${gap}px 0;
`
