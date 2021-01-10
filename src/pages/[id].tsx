import { NextPageContext } from 'next'
import Link from 'next/link'

import { apiBase } from '../config'
import { Button, Card, Grid } from '../styled'

export default function Profile({ data }) {
  const {
    id,
    props: { name, ...rest },
    outgoing_edges,
  } = data

  return (
    <>
      <h2>{name}</h2>
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
        {outgoing_edges?.map(({ id, name, type }) => (
          <Link key={id} href={`/${id}`}>
            <Card key={id} small>
              <a>{name}</a> ({type})
            </Card>
          </Link>
        ))}
      </Grid>
      <Link href={`/connections/${id}`}>
        <Button as="a">Add connection</Button>
      </Link>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const res = await fetch(`${apiBase}/people/${context.query.id}`)
  const data = await res.json()

  return { props: { data } }
}
