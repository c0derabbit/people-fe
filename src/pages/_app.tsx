import Head from 'next/head'

import { AuthProvider } from '../hooks/use-auth'
import { SortSearchProvider } from '../hooks/use-sort-search'

import { Header } from '../components'
import { Container } from '../styled'

import 'modern-normalize/modern-normalize.css';
import '../styled/settings.css'

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SortSearchProvider>
        <Head>
          <title>Peoplegraph</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Container as="main">
          <Component {...pageProps} />
        </Container>
      </SortSearchProvider>
    </AuthProvider>
  )
}

export default App
