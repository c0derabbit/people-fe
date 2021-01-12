import Link from 'next/link'
import styled from 'styled-components'

import uniqBy from '../../helpers/uniq-by'
import { Card, gap } from '../../styled'
import { Person } from '../../types'

export default function PersonCard({ id, props: { name }, edges }: Person) {
  const connections = uniqBy([...edges.out, ...edges.in], 'id')

  return (
    <Link href={`/${id}`}>
      <Card as="li">
        <Name>{name}</Name>
        {connections.map(({ id, name }) => (
          <Link key={id} href={`/${id}`}>
            <Connection>{name}</Connection>
          </Link>
        ))}
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

const Name = styled.a`
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: ${gap}px;
`
