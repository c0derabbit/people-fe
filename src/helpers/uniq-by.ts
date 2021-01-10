export default function uniqBy(arr: Record<string, any>[], key: string) {
  if (!Array.isArray(arr)) return arr

  const found = new Set()

  return arr.filter(el => {
    if (found.has(el[key]))
      return false

    found.add(el[key])
    return true
  })
}
