import Head from 'next/head'

import useAuth from '../hooks/use-auth'
import useSortSearch from '../hooks/use-sort-search'
import { Button, Container, Grid } from '../styled'
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
      <Container as="main">
        {isSignedIn
          ? (
            <>
              <SortSearchHeader />
              <Grid as="ul">
                {sort(people).map((person: Person) => (
                  <PersonCard key={person.id} {...person} />
                ))}
              </Grid>
            </>
          ) : <Button onClick={signIn}>Sign in</Button>
        }
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const apiUrl= 'https://people-api-2020.herokuapp.com/people/'
  const data = await fetch(apiUrl)
  const people = await data.json()

  return { props: { people } }
}

export default Home
