export interface Person {
  id: string;
  props: PersonProps;
  outgoing_edges: OutgoingEdge[];
}

interface PersonProps {
  name: string;
}

interface OutgoingEdge {
  id: string;
  type: string;
  name: string;
}
