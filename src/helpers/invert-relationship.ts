export default function invertRelationship(person: Record<string, string>) {
  const inverse = {
    mother: 'child',
    father: 'child',
    daughter: 'parent',
    son: 'parent',
    grandmother: 'grandchild',
    grandfather: 'grandchild',
    granddaughter: 'grandparent',
    grandson: 'grandparent',
    wife: 'husband',
    husband: 'wife',
    girlfriend: 'boyfriend',
    boyfriend: 'girlfriend',
  }

  return { ...person, type: inverse[person.type] || person.type }
}
