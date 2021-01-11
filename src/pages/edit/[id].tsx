import { useRouter } from 'next/router'
import { NextPageContext } from 'next'
import Head from 'next/head'

import Form from '../../components/form'
import { apiBase } from '../../config'

export default function Edit({ data }) {
  const {
    query: { id },
  } = useRouter()

  const {
    props: { name },
  } = data

  return (
    <>
      <Head>
        <title>{name} | Peoplegraph</title>
      </Head>
      <h2>Update {name}</h2>
      <Form id={id} method="PUT" {...data.props} />
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const res = await fetch(`${apiBase}/people/${context.query.id}`)
  const data = await res.json()

  return { props: { data } }
}
