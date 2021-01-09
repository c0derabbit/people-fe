import { AuthProvider } from '../hooks/use-auth'
import { SortSearchProvider } from '../hooks/use-sort-search'

import 'modern-normalize/modern-normalize.css';
import '../styled/settings.css'

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
