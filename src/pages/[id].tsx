import { useState } from 'react'
import { NextPageContext } from 'next'
import Link from 'next/link'
import styled from 'styled-components'

import uniqBy from '../helpers/uniq-by'
import { apiBase } from '../config'
import { ConfirmDelete } from '../components'
import { Button, Card, Grid, gap } from '../styled'
import invertRelationship from '../helpers/invert-relationship'

export default function Profile({ data }) {
  const {
    id,
    props: { name, 'full name': fullName, ...rest },
    edges,
  } = data

  const relationships = uniqBy(
    [...edges.out, ...edges.in.map(invertRelationship)],
    'id'
  )

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const hide = () => {
    setShowConfirmDelete(false)
  }

  return (
    <>
      <h2>{name}</h2>
      {fullName && <FullName>{fullName}</FullName>}
      <Link href={`/edit/${id}`}>
        <Button as="a">Edit</Button>
      </Link>
      <dl>
        {Object.entries(rest)?.map(([key, value]) => (
          <div key={key}>
            <dt>{key}</dt>
            <dd>{value || '—'}</dd>
          </div>
        ))}
      </dl>

      <h3>Connections:</h3>
      <Grid cols={4} style={{ marginBottom: '1rem' }}>
        {relationships?.map(({ id, name, type }) => (
          <Link key={id} href={`/${id}`}>
            <Card key={id} small>
              <a>{name}</a> ({type})
            </Card>
          </Link>
        ))}
      </Grid>
      <Link href={`/connections/${id}`}>
        <Button as="a">Add or edit connections</Button>
      </Link>
      <p style={{ position: 'relative' }}>
        <Button onClick={() => setShowConfirmDelete(true)} intent="danger">
          Delete
        </Button>
        {showConfirmDelete && <ConfirmDelete id={id} hide={hide} />}
      </p>
    </>
  )
}

const FullName = styled.small`
  display: block;
  margin-bottom: ${gap}px;
`

export async function getServerSideProps(context: NextPageContext) {
  const res = await fetch(`${apiBase}/people/${context.query.id}`)
  const data = await res.json()

  return { props: { data } }
}
