import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'

import by from '../helpers/sort-by'
import PersonCard, { Person } from '../components/person-card'

export const Home: React.FC<{ people: Person[] }> = ({ people = [] }) => {
  const [reverse, setReverse] = useState(false)
  const [sorter, setSorter] = useState<string>('id')
  const [sortedPeople, setSortedPeople] = useState(
    [...people].sort(by(sorter))
  )

  const sort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorter(e.target.value)
    setReverse(false)
  }, [])

  useEffect(() => {
    setSortedPeople([...people].sort(by(sorter, { reverse })))
  }, [sorter, reverse])

  return (
    <div>
      <Head>
        <title>People we know</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
        <ul>
          {sortedPeople.map((person: Person) => (
            <PersonCard key={person.id} {...person} />
          ))}
        </ul>
      </main>
      <footer></footer>
    </div>
  )
}

export async function getStaticProps() {
  const people = [
    { id: '1', name: 'X. Y.' },
    { id: '2', name: 'Y. Z.' },
  ]
 
  return { props: { people } }
}

export default Home
