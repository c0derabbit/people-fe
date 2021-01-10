export interface Person {
  id: string;
  props: PersonProps;
  edges: {
    in: Edge[];
    out: Edge[];
  }
}

interface PersonProps {
  name: string;
}

interface Edge {
  id: string;
  type: string;
  name: string;
}
