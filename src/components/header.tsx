import { Button, Heading, Pane, defaultTheme } from 'evergreen-ui'

import useAuth from '../hooks/use-auth'
import { gap, pageWidth } from '../styles/settings'

export default function Header() {
  const { isSignedIn, signOut } = useAuth()

  return (
    <Pane
      is="header"
      paddingY={gap / 2}
      elevation={1}
      position="absolute"
      zIndex={2}
      width="100vw"
      background="white"
    >
      <Pane
        justifyContent="space-between"
        alignItems="center"
        display="flex"
        {...pageWidth}
      >
        <Heading
          is="a"
          href="/"
          color={defaultTheme.palette.neutral.dark}
          size={100}
          fontSize={14}
          textDecoration="none"
        >
          Peoplegraph
        </Heading>
        {isSignedIn && (
          <Button onClick={signOut}>
            Log out
          </Button>
        )}
      </Pane>
    </Pane>
  )
}
