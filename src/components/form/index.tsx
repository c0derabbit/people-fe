import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import t from '../../i18n'
import { apiBase } from '../../config'
import { useRequest } from '../../hooks'
import { Button, Field as FieldBase, gap, shadow } from '../../styled'

interface FormProps {
  id?: string
  method?: 'POST' | 'PUT' | 'PATCH'
  [props: string]: string | number
}

export default function Form({
  method = 'POST',
  id = '',
  ...props
}: FormProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (success && id) router.push(`/${id}`)
    // TODO redirect after create as well
  }, [success])

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

    const { error, success } = await useRequest(`${apiBase}/people/${id}`, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    setError(error)
    setSuccess(success)
  }

  const fields = [
    { name: 'name', required: true },
    { name: 'full name' },
    { name: 'hobbies' },
    { name: 'by day', placeholder: 'what do they do' },
    { name: 'location' },
    { name: 'last contact date', placeholder: 'dd/mm/yyyy' },
    { name: 'notes' },
  ]

  return (
    <StyledForm onSubmit={sendForm}>
      {fields.map(({ name, required, placeholder }) => (
        <label key={name}>
          {t(`props.${name}`)}
          <br />
          <Field
            type="text"
            name={name}
            required={required}
            defaultValue={props[name]}
            placeholder={t(placeholder)}
          />
        </label>
      ))}
      <Button type="submit">{t(id ? 'update' : 'create')}</Button>
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
