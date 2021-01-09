import styled from 'styled-components'

import useAuth from '../hooks/use-auth'
import { Button, Container } from '../styled'

export default function Header() {
  const { isSignedIn, signOut } = useAuth()

  return (
    <StyledHeader>
      <Container>
        <Title>
          Peoplegraph
        </Title>
        {isSignedIn && (
          <Button onClick={signOut}>
            Log out
          </Button>
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
    justify-content: space-between;
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
