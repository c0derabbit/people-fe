import Link from 'next/link'
import styled from 'styled-components'

import { Card, gap } from '../styled'
import { Person } from '../types'

const PersonCard: React.FC<Person> = ({
  id,
  props: { name },
  outgoing_edges: edges,
}) => (
  <Link href={`/${id}`}>
    <Card as="li">
      <a>
        <Name>{name}</Name>
          {edges?.map(({ id, type, name }) => (
            <Link key={id} href={`/${id}`}>
              <Connection>{name} ({type})</Connection>
            </Link>
          ))}
      </a>
    </Card>
  </Link>
)

const Connection = styled.a`
  margin-right: ${gap}px;
  font-size: .9rem;

  &:hover,
  &:focus {
    text-decoration: 2px underline;
  }
`

const Name = styled.h2`
  font-size: 1.2rem;
  margin-top: 0;
`

export default PersonCard
