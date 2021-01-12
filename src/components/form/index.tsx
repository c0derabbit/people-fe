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

interface FormState {
  success?: string | null
  data?: Record<string, any>
  error?: string | null
}

export default function Form({
  method = 'POST',
  id = '',
  ...props
}: FormProps) {
  const [formState, setFormState] = useState<FormState>({})
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const { success, data, error } = formState
    if (success || error) {
      setTimeout(() => { setSubmitting(false) }, 500)
    }

    const { id } = data || {}
    if (id) router.push(`/${id}`)
  }, [formState])

  function goBack() {
    router?.back()
  }

  async function sendForm(e: React.FormEvent<HTMLFormElement>) {
    setSubmitting(true)
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

    const { success, data, error } = await useRequest(`${apiBase}/people/${id}`, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    setFormState({ success, data, error })
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

  const { success, error } = formState

  return (
    <>
      <Button onClick={goBack} intent="secondary">
        {t('back')}
      </Button>
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
        <Button type="submit" disabled={submitting}>
          {t(id ? 'update' : 'create')}
        </Button>
        <p>
          {error && <strong>{error}</strong>}
          {success && <strong>{success}</strong>}
        </p>
      </StyledForm>
    </>
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
