import by from '../sort-by'

describe('sortBy', () => {
  const people = [
    {
      id: 'first',
      foo: 2,
      name: { first: 'A', last: 'Z' },
    },
    {
      id: 'second',
      foo: 2,
      name: { first: 'B', last: 'B' },
    },
  ]

  it('can sort people by id', () => {
    const [first, second] = [...people].sort(by('id'))

    expect(first).toEqual(people[0])
    expect(second).toEqual(people[1])
  })

  it('can sort in reverse order', () => {
    const [first, second] = [...people].sort(by('id', { reverse: true }))

    expect(first).toEqual(people[1])
    expect(second).toEqual(people[0])
  })

  it('leaves original order if property is the same (simple or reverse)', () => {
    const [first, second] = [...people].sort(by('foo'))

    expect(first).toEqual(people[0])
    expect(second).toEqual(people[1])

    const [firstReverse, secondReverse] = [...people].sort(
      by('foo', { reverse: true })
    )

    expect(firstReverse).toEqual(people[0])
    expect(secondReverse).toEqual(people[1])
  })

  it('can sort by nested properties', () => {
    const [first, second] = [...people].sort(by('name.last'))

    expect(first).toEqual(people[1])
    expect(second).toEqual(people[0])
  })
})
