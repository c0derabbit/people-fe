import { useEffect, useState } from 'react'

import useAuth from '../hooks/use-auth'
import useSearch from '../hooks/use-search'
import { apiBase } from '../config'
import { Button, Grid } from '../styled'
import { PersonCard, SearchHeader } from '../components'
import { Person } from '../types'

export const Home: React.FC<{ people: Person[] }> = ({ people = [] }) => {
  const { isSignedIn, signIn } = useAuth()
  const { search } = useSearch()
  const [clientSidePeople, setData] = useState([])

  useEffect(() => {
    // FIXME this is temporary for frontend debugging
    const fetchData = async () => {
      const res = await fetch(`${apiBase}/people/`)
      const data = await res.json()
      setData(data)
    }

    fetchData()
  }, [])

  return isSignedIn
    ? (
      <>
        <SearchHeader />
        <Grid as="ul">
          {search(clientSidePeople)?.map((person: Person) => (
            <PersonCard key={person.id} {...person} />
          ))}
        </Grid>
      </>
    ) : <Button onClick={signIn}>Sign in</Button>
}

export async function getServerSideProps() {
  /* TODO use this instead of client-side fetch once debugging is done
  const data = await fetch(`${apiBase}/people/`)
  const people = await data.json()

  return { props: { people } }
   */
  return { props: {} }
}

export default Home
