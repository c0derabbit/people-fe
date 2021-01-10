import { useState } from 'react'
import styled from 'styled-components'

import useRequest from '../hooks/use-request'
import { apiBase } from '../config'
import { Button, Field as FieldBase, gap, shadow } from '../styled'

export default function Form({ method = 'POST', id = '', ...props }) {
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

    const { error, success } = await useRequest(
      `${apiBase}/people/${id}`,
      {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    )

    setError(error)
    setSuccess(success)
  }

  function capitalise(str: string) {
    if (str.length <= 1) return str.toUpperCase()

    return str[0].toUpperCase() + str.slice(1)
  }

  const fields = [
    { name: 'name', required: true },
    { name: 'full name' },
    { name: 'hobbies' },
    { name: 'by day' },
    { name: 'location' },
    { name: 'last contact date', placeholder: 'dd/mm/yyyy' },
    { name: 'notes' },
  ]

  return (
    <StyledForm onSubmit={sendForm}>
      {fields.map(({ name, required, placeholder }) => (
        <label key={name}>
          {capitalise(name)}<br />
          <Field
            type="text"
            name={name}
            required={required}
            defaultValue={props[name]}
            placeholder={placeholder}
          />
        </label>
      ))}
      <Button type="submit">{!!id ? 'Update' : 'Create'}</Button>
      <p>
        {error && <strong>{error}</strong>}
        {success && <strong>{success}</strong>}
      </p>
    </StyledForm>
  )
}

const Field = styled(FieldBase)`
  width: 100%;
  border-color: var(--primary-lighter);
`

const StyledForm = styled.form`
  margin: ${gap}px 0;
  padding: ${gap / 2}px;
  max-width: 400px;
  border: 3px solid;
  box-shadow: ${shadow};

  label {
    display: block;
  }
`
