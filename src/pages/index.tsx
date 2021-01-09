import Head from 'next/head'

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
      <main>
        {isSignedIn
          ? (
            <>
              <SortSearchHeader />
              <div>
                {sort(people).map((person: Person) => (
                  <PersonCard key={person.id} {...person} />
                ))}
              </div>
            </>
          ) : <button onClick={signIn}>Sign in</button>
        }
      </main>
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
