import uniqBy from '../uniq-by'

describe('uniqBy', () => {
  it('filters array of objects by a chosen property', () => {
    const things = [
      { name: 'x', age: 100 },
      { name: 'y', age: 100 },
      { name: 'x', age: 93 },
    ]

    expect(uniqBy(things, 'name')).toHaveLength(2)
  })

  it('does not break on empty array', () => {
    expect(uniqBy([], 'name')).toHaveLength(0)
  })

  it('does not break on non-array', () => {
    expect(uniqBy(null, 'name')).toBe(null)
  })
})
