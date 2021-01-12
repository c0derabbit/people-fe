import { useState } from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import t from '../i18n'
import invertRelationship from '../helpers/invert-relationship'
import uniqBy from '../helpers/uniq-by'
import { apiBase } from '../config'
import { ConfirmDelete } from '../components'
import { Button, Card, Flex, Grid, gap } from '../styled'

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
      <Head>
        <title>
          {name} | {t('pageTitle')}
        </title>
      </Head>

      <Name>{name}</Name>
      <FullName>{fullName}</FullName>
      <Flex>
        <Link href={`/edit/${id}`}>
          <Button as="a">{t('edit')}</Button>
        </Link>
        <DeleteWrapper>
          <Button onClick={() => setShowConfirmDelete(true)} intent="danger">
            {t('delete')}
          </Button>
          {showConfirmDelete && <ConfirmDelete id={id} hide={hide} />}
        </DeleteWrapper>
      </Flex>
      <dl>
        {Object.entries(rest)?.map(([key, value]) => (
          <Info key={key}>
            <dt>{t(`props.${key}`)}</dt>
            <dd>{value || '—'}</dd>
          </Info>
        ))}
      </dl>

      <h3>{t('connections')}:</h3>
      <Grid cols={4} style={{ marginBottom: `${gap * 1.5}px` }}>
        {relationships?.map(({ id, name, type }) => (
          <Link key={id} href={`/${id}`}>
            <Card key={id} small>
              <a>{name}</a> ({type})
            </Card>
          </Link>
        ))}
      </Grid>
      <Link href={`/connections/${id}`}>
        <Button as="a">{t('createOrModifyConnection')}</Button>
      </Link>
    </>
  )
}

const DeleteWrapper = styled.div`
  position: relative;
`

const FullName = styled.small`
  display: block;
  margin-bottom: ${gap * 2}px;
`

const Info = styled.div`
  margin: ${gap}px 0;
  max-width: 680px;

  &:first-of-type {
    margin-top: ${gap * 2}px;
  }

  dt {
    font-weight: 600;
    font-size: .75rem;
    letter-spacing: .35px;
    text-transform: uppercase;
    color: var(--primary-lighter);
  }

  dd {
    margin: ${gap / 2}px 0 ${gap * 1.5}px;
  }
`

const Name = styled.h2`
  margin-bottom: ${gap / 2}px;
`

export async function getServerSideProps(context: NextPageContext) {
  const res = await fetch(`${apiBase}/people/${context.query.id}`)
  const data = await res.json()

  return { props: { data } }
}
