import { useState } from 'react'

import { apiBase } from '../config'
import { Button, Field } from '../styled'

export default function New() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function sendForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { elements } = e.target as any
    const properties = {}

    Array.from(elements)
      .filter((el: any) => !!el.name)
      .forEach(({ name, value }) => {
        properties[name] = value
      })

    const body = {
      properties,
    }

    try {
      const res = await fetch(
        `${apiBase}/people/`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      if (res.ok) {
        setError(null)
        setSuccess('Person added successfully. Yay! 🎉')
      } else {
        setSuccess(null)
        setError(`Something went wrong: ${res.statusText}`)
      }
    } catch (error) {
      setSuccess(null)
      setError(`Something went wrong: ${error} 🙊`)
    }
  }

  return (
    <form onSubmit={sendForm}>
      <Field type="text" name="name" placeholder="Name" required />
      <br />
      <Button type="submit">Create</Button>
      <p>
        {error && <strong>{error}</strong>}
        {success && <strong>{success}</strong>}
      </p>
    </form>
  )
}
