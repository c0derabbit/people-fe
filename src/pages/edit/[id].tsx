import { useRouter } from 'next/router'
import { NextPageContext } from 'next'
import Head from 'next/head'

import t from '../../i18n'
import Form from '../../components/form'

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
        <title>
          {name} | {t('pageTitle')}
        </title>
      </Head>
      <h2>{name}</h2>
      <Form id={id} method="PUT" {...data.props} />
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const res = await fetch(`${process.env.API_BASE}/people/${context.query.id}`)
    const data = await res.json()

    if (!data.props) throw 'not found'

    return { props: { data } }
  } catch(error) {
    return { notFound: true }
  }
}
