import { AuthProvider } from '../hooks/use-auth'
import { SortSearchProvider } from '../hooks/use-sort-search'

import '../styles/index.css'

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SortSearchProvider>
        <Component {...pageProps} />
      </SortSearchProvider>
    </AuthProvider>
  )
}

export default App
