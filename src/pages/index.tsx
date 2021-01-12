import useAuth from '../hooks/use-auth'
import useSearch from '../hooks/use-search'
import { Grid } from '../styled'
import { PersonCard, SearchHeader } from '../components'
import type { Person } from '../types'

export const Home: React.FC<{ people: Person[] }> = ({ people }) => {
  const { isSignedIn } = useAuth()
  const { search } = useSearch()

  return isSignedIn ? (
    <>
      <SearchHeader />
      <Grid as="ul">
        {search(people)?.map((person: Person) => (
          <PersonCard key={person.id} {...person} />
        ))}
      </Grid>
    </>
  ) : <p style={{ fontSize: '64px' }}>🐕</p>
}

export async function getServerSideProps() {
  try {
    const data = await fetch(`${process.env.API_BASE}/people/`)
    const people = await data.json()

    return { props: { people } }
  } catch (error) {
    return { notFound: true }
  }
}

export default Home
