import invertRelationship from '../invert-relationship'

describe('invertRelationship', () => {
  it('inverts relationship name', () => {
    const mother = { name: 'Mom', type: 'mother', id: 'foo' } as any
    expect(invertRelationship(mother).type).toBe('child')
  })

  it('returns same if no inverse found', () => {
    const friend = { name: 'Mom', type: 'friend', id: 'foo' } as any
    expect(invertRelationship(friend).type).toBe('friend')
  })
})
