import { useState } from 'react'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'

import by from '../../helpers/sort-by'
import { apiBase } from '../../config'
import { Button, Field } from '../../styled'
import { Person } from '../../types'

export default function AddConnection({ data, everyone }) {
  const { query: { id } } = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function sendForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { elements } = e.target as any
    const {
      to: { value: to },
      type: { value: type },
    } = elements

    const body = { from: id, to, type }

    try {
      const res = await fetch(
        `${apiBase}/relationships/`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      if (res.ok) {
        setError(null)
        setSuccess(`Connected successfully. Yay! 🎉`)
      } else {
        setSuccess(null)
        throw res.statusText
      }
    } catch (error) {
      setSuccess(null)
      setError(`Something went wrong: ${error} 🙊`)
    }
  }

  const {
    props: { name },
  } = data

  return (
    <>
      <h2>Update {name}’s connections</h2>
      <form onSubmit={sendForm}>
        <Field as="select" name="to">
          {everyone?.sort(by('props.name')).map(({ id, props }) => (
            <option value={id}>{props.name}</option>
          ))}
        </Field>
        <label style={{ display: 'block' }}>
          Relationship:<br />
          <Field type="text" name="type" placeholder={`e.g. X is ${name}’s friend`} />
        </label>
        <Button type="submit">
          Add connection
        </Button>
        <p>
          {error && <strong>{error}</strong>}
          {success && <strong>{success}</strong>}
        </p>
      </form>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  const everyoneRes = await fetch(`${apiBase}/people/`)
  const res = await fetch(`${apiBase}/people/${context.query.id}`)
  const everyone = (await everyoneRes.json()).filter((person: Person) => person.id !== id)
  const data = await res.json()

  return { props: { data, everyone } }
}
