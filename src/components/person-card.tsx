import styled from 'styled-components'

import { Person } from '../types'
import { gap } from '../styled'

const PersonCard: React.FC<Person> = ({
  name,
}) => (
  <Card>
    {name}
  </Card>
)

const Card = styled.li`
  padding: ${gap}px;
  border: 3px solid;
  box-shadow: 4px 3px 0 0 var(--light-accent);
`

export default PersonCard
