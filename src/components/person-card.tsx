import styled from 'styled-components'

import { Person } from '../types'
import { buttonlike, gap } from '../styled'

const PersonCard: React.FC<Person> = ({
  props: { name },
}) => (
  <Card>
    <h2>{name}</h2>
  </Card>
)

const Card = styled.li`
  ${buttonlike}
  background: var(--lighter-accent);
  padding: ${gap}px;
  border: 3px solid;
`

export default PersonCard
