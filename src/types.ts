export interface Person {
  id: string
  props: PersonProps
  edges: {
    in: Edge[]
    out: Edge[]
  }
}

interface PersonProps {
  name: string
  fullName?: string
  [props: string]: string | number
}

interface Edge {
  id: string
  type: string
  name: string
}
