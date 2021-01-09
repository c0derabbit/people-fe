import { Pane } from 'evergreen-ui'
import { Person } from '../types'

const PersonCard: React.FC<Person> = ({
  name,
}) => (
  <Pane is="li" elevation={1}>
    {name}
  </Pane>
)

export default PersonCard
