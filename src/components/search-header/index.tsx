import styled from 'styled-components'

import t from '../../i18n'
import { useSearch } from '../../hooks'
import { Field, gap } from '../../styled'

export default function SearchHeader() {
  const { setSearch } = useSearch()

  return (
    <Header>
      <Field
        type="text"
        placeholder={t('search')}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Header>
  )
}

const Header = styled.div`
  padding: ${gap}px 0;
`
