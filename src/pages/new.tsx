import { useState } from 'react'
import { apiBase } from '../config'

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
      await fetch(
        `${apiBase}/people`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      setSuccess('Person added successfully. Yay! 🎉')
    } catch (error) {
      setError(`Something went wrong: ${error} 🙊`)
    }
  }

  return (
    <form onSubmit={sendForm}>
      <input type="text" name="name" required />
      <button type="submit">Create</button>
      <p>
        {error && <strong>{error}</strong>}
        {success && <strong>{success}</strong>}
      </p>
    </form>
  )
}
