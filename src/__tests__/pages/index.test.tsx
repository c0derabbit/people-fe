import { getPage } from 'next-page-tester'
import { render } from '../testUtils'

describe('Home page', () => {
  (global as any).fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ records: TEST_DATA }),
    })
  )

  it('matches snapshot', async () => {
    const { page } = await getPage({ route: '/' })
    const { asFragment } = render(page)

    expect(asFragment()).toMatchSnapshot()
  })
})

const TEST_DATA = [
  {
    id: 'one',
  },
  {
    id: 'two',
  },
]
