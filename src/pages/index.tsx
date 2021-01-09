import Head from 'next/head'
import { useCallback } from 'react'
import { Button, Pane } from 'evergreen-ui'

import useAuth from '../hooks/use-auth'
import useSortSearch from '../hooks/use-sort-search'
import Header from '../components/header'
import PersonCard, { Person } from '../components/person-card'
import { gap, pageWidth } from '../styles/settings'

export const Home: React.FC<{ people: Person[] }> = ({ people = [] }) => {
  const { isSignedIn, signIn } = useAuth()
  const { sortedItems, reverse, setSorter, setReverse } = useSortSearch(people)

  const sort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorter(e.target.value)
    setReverse(false)
  }, [])

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
              <select onChange={sort}>
                <option value="id">id</option>
              </select>
              <label>
                <input
                  type="checkbox"
                  onChange={() => {
                    setReverse(!reverse)
                  }}
                  checked={reverse}
                />
                reverse
              </label>
              <Pane is="ul" padding={0} listStyle="none">
                {sortedItems.map((person: Person) => (
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
