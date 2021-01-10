import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import useRequest from '../hooks/use-request'
import { apiBase } from '../config'
import { Button, Popup } from '../styled'

export default function ConfirmDelete({ id, hide }) {
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  async function deletePerson(e) {
    const { error, success } = await useRequest(
      `${apiBase}/people/${id}`,
      { method: 'DELETE' },
    )

    if (success) router.push('/')
    setError(error)
  }

  return (
    <Popup>
      <Title>Are you sure?</Title>
      <Button onClick={hide} style={{ marginRight: '1rem' }}>
        Um, no
      </Button>
      <Button onClick={deletePerson} intent="danger">
        YES!
      </Button>
      {error && <p><strong>{error}</strong></p>}
    </Popup>
  )
}

const Title = styled.strong`
  display: block;
  margin: .5rem 0 1rem;
`
