import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { apiBase } from '../config'
import { Button, Popup } from '../styled'

export default function ConfirmDelete({ id, hide }) {
  const router = useRouter()

  return (
    <Popup>
      <Title>Are you sure?</Title>
      <Button onClick={hide} style={{ marginRight: '1rem' }}>
        Um, no
      </Button>
      <Button intent="danger">
        YES!
      </Button>
    </Popup>
  )
}

const Title = styled.strong`
  display: block;
  margin: .5rem 0 1rem;
`
