import { useState } from 'react'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'
import styled from 'styled-components'

import by from '../../helpers/sort-by'
import t from '../../i18n'
import useRequest from '../../hooks/use-request'
import { Button, Field, gap } from '../../styled'
import type { Person } from '../../types'

type MessageState = string | null

export default function AddConnection({ data, everyone }) {
  const router = useRouter()

  const [error, setError] = useState<MessageState>()
  const [success, setSuccess] = useState<MessageState>()

  function goBack() {
    router.back()
  }

  async function sendForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { elements } = e.target as any
    const {
      to: { value: to },
      type: { value: type },
    } = elements

    const body = { from: router.query.id, to, type }

    const { error, success } = await useRequest(`${process.env.API_BASE}/relationships/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    setError(error)
    setSuccess(success)
  }

  const {
    props: { name },
  } = data

  return (
    <>
      <h2>Update {name}’s connections</h2>
      <Button onClick={goBack} intent="secondary">
        {t('back')}
      </Button>
      <Form onSubmit={sendForm}>
        <Field as="select" name="to">
          {everyone?.sort(by('props.name')).map(({ id, props }) => (
            <option key={id} value={id}>
              {props.name}
            </option>
          ))}
        </Field>
        <label style={{ display: 'block' }}>
          Relationship:
          <br />
          <Field
            type="text"
            name="type"
            placeholder={`e.g. X is ${name}’s friend`}
          />
        </label>
        <Button type="submit">Add connection</Button>
        <p>
          {error && <strong>{error}</strong>}
          {success && <strong>{success}</strong>}
        </p>
      </Form>
    </>
  )
}

const Form = styled.form`
  margin-top: ${gap * 2}px;
`

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { id } = context.query
    const everyoneRes = await fetch(`${process.env.API_BASE}/people/`)
    const res = await fetch(`${process.env.API_BASE}/people/${context.query.id}`)
    const everyone = (await everyoneRes.json()).filter(
      (person: Person) => person.id !== id
    )
    const data = await res.json()

    if (!data.props) throw 'not found'

    return { props: { data, everyone } }
  } catch(error) {
    return { notFound: true }
  }
}
