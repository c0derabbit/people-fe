import Link from 'next/link'
import styled from 'styled-components'

import useAuth from '../hooks/use-auth'
import { Button, Container, gap } from '../styled'

export default function Header() {
  const { isSignedIn, signOut } = useAuth()

  return (
    <StyledHeader>
      <Container>
        <Title>
          <Link href="/"><a>Peoplegraph</a></Link>
        </Title>
        {isSignedIn && (
          <>
            <Link href="/new">
              <Button as="a">New</Button>
            </Link>
            <Button onClick={signOut} style={{ marginLeft: 'auto' }}>
              Log out
            </Button>
          </>
        )}
      </Container>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  border-bottom: 3px solid;

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
  letter-spacing: .2px;
  text-transform: uppercase;
`
