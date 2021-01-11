import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import t from '../../i18n'
import { apiBase } from '../../config'
import { useRequest, useSearch } from '../../hooks'
import { Button, Popup } from '../../styled'

interface PopupInfo {
  id: string
  hide: () => void
}

export default function ConfirmDelete({ id, hide }: PopupInfo) {
  const [error, setError] = useState<string | null>(null)
  const { setSearch } = useSearch()
  const router = useRouter()

  async function deletePerson() {
    const { error, success } = await useRequest(`${apiBase}/people/${id}`, {
      method: 'DELETE',
    })

    if (success) {
      setSearch('')
      router.push('/')
    } else {
      setError(error)
    }
  }

  return (
    <Popup>
      <Title>{t('areYouSure')}</Title>
      <p>{t('personWillBeDeleted')}</p>
      <Button onClick={hide} style={{ marginRight: '1rem' }}>
        {t('cancel')}
      </Button>
      <Button onClick={deletePerson} intent="danger">
        {t('YES')}!!
      </Button>
      {error && (
        <p>
          <strong>{error}</strong>
        </p>
      )}
    </Popup>
  )
}

const Title = styled.strong`
  display: block;
  margin: 0.5rem 0 1rem;
`
