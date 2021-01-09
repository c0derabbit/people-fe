export interface Person {
  id: string;
  name: string;
}

const PersonCard: React.FC<Person> = ({
  name,
}) => (
  <li>
    {name}
  </li>
)

export default PersonCard
