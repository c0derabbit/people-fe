import { Person } from '../types'

const PersonCard: React.FC<Person> = ({
  name,
}) => (
  <li>
    {name}
  </li>
)

export default PersonCard
