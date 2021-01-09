import Head from 'next/head'
import { Button, Pane } from 'evergreen-ui'

import useAuth from '../hooks/use-auth'
import useSortSearch from '../hooks/use-sort-search'
import { gap, pageWidth } from '../styles/settings'
import { Header, PersonCard, SortSearchHeader } from '../components'
import { Person } from '../types'

export const Home: React.FC<{ people: Person[] }> = ({ people = [] }) => {
  const { isSignedIn, signIn } = useAuth()
  const { sort } = useSortSearch()

  return (
    <>
      <Head>
        <title>Peoplegraph</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Pane is="main" paddingX={gap} paddingY={70} {...pageWidth}>
        {isSignedIn
          ? (
            <>
              <SortSearchHeader />
              <Pane
                is="ul"
                padding={0}
                listStyle="none"
                display="grid"
                gap={20}
                gridTemplateColumns="repeat(3, 1fr)"
              >
                {sort(people).map((person: Person) => (
                  <PersonCard key={person.id} {...person} />
                ))}
              </Pane>
            </>
          ) : <Button onClick={signIn}>Sign in</Button>
        }
      </Pane>
    </>
  )
}

export async function getServerSideProps() {
  const people = [
    { id: '1', name: 'X. Y.' },
    { id: '2', name: 'Y. Z.' },
  ]
 
  return { props: { people } }
}

export default Home
