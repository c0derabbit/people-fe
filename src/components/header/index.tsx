import Link from 'next/link'
import styled from 'styled-components'

import t from '../../i18n'
import { Button, Container, gap, shadowLg } from '../../styled'
import { useAuth, useSearch } from '../../hooks'

export default function Header() {
  const { signIn, isSignedIn, signOut } = useAuth()
  const { setSearch } = useSearch()

  return (
    <StyledHeader>
      <Container>
        <Title>
          <Link href="/">
            <a
              onClick={() => {
                setSearch('')
              }}
            >
              {t('pageTitle')}
            </a>
          </Link>
        </Title>
        {isSignedIn
          ? (
            <>
              <Link href="/new">
                <Button as="a">{t('newContact')}</Button>
              </Link>
              <Button onClick={signOut} style={{ marginLeft: 'auto' }}>
                {t('signOut')}
              </Button>
            </>
          ) : <Button onClick={signIn}>{t('signIn')}</Button>
        }
      </Container>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  border-bottom: 3px solid;
  position: fixed;
  width: 100%;
  box-shadow: ${shadowLg};
  background: white;
  z-index: 999;

  + * {
    padding-top: 60px;
  }

  ${Container} {
    height: 44px;
    display: flex;
    gap: ${gap}px;
    justify-content: flex-start;
    align-items: center;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`
