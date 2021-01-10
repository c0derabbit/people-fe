import useAuth from '../hooks/use-auth'
import useSearch from '../hooks/use-search'
import { apiBase } from '../config'
import { Button, Grid } from '../styled'
import { PersonCard, SearchHeader } from '../components'
import { Person } from '../types'

export const Home: React.FC<{ people: Person[] }> = ({ people = [] }) => {
  const { isSignedIn, signIn } = useAuth()
  const { search } = useSearch()

  console.log({ people })

  return isSignedIn
    ? (
      <>
        <SearchHeader />
        <Grid as="ul">
          {search(people)?.map((person: Person) => (
            <PersonCard key={person.id} {...person} />
          ))}
        </Grid>
      </>
    ) : <Button onClick={signIn}>Sign in</Button>
}

export async function getServerSideProps() {
  const data = await fetch(`${apiBase}/people/`)
  const people = await data.json()

  return { props: { people } }
}

export default Home
