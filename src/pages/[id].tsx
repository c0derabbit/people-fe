import { NextPageContext } from 'next'
import Link from 'next/link'

import { apiUrl } from '../config'
import { Card, Grid } from '../styled'

export default function Page({ data }) {
  const {
    props: { name, ...rest },
    outgoing_edges,
  } = data

  return (
    <>
      <h2>{name}</h2>
      <dl>
        {Object.entries(rest).map(([key, value]) => (
          <div key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <h3>Connections:</h3>
      <Grid cols={4}>
        {outgoing_edges.map(({ id, name, type }) => (
          <Link key={id} href={`/${id}`}>
            <Card key={id} small>
              <a>{name}</a> ({type})
            </Card>
          </Link>
        ))}
      </Grid>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const res = await fetch(`${apiUrl}/${context.query.id}`)
  const data = await res.json()

  return { props: { data } }
}
