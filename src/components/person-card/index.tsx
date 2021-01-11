import Link from 'next/link'
import styled from 'styled-components'

import uniqBy from '../../helpers/uniq-by'
import { Card, gap } from '../../styled'
import { Person } from '../../types'

export default function PersonCard({ id, props: { name }, edges }: Person) {
  const relationships = uniqBy([...edges.out, ...edges.in], 'id')

  return (
    <Link href={`/${id}`}>
      <Card as="li">
        <a>
          <Name>{name}</Name>
          {relationships.map(({ id, name }) => (
            <Link key={id} href={`/${id}`}>
              <Connection>{name}</Connection>
            </Link>
          ))}
        </a>
      </Card>
    </Link>
  )
}

const Connection = styled.a`
  margin-right: ${gap}px;
  font-size: 0.9rem;

  &:hover,
  &:focus {
    text-decoration: 2px underline;
  }
`

const Name = styled.h2`
  font-size: 1.2rem;
  margin-top: 0;
`
