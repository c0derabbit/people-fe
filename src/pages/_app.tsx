import Head from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'

import { AuthProvider } from '../hooks/use-auth'
import { SortSearchProvider } from '../hooks/use-sort-search'

import { Header } from '../components'
import { Container } from '../styled'

import 'modern-normalize/modern-normalize.css';

const GlobalStyle = createGlobalStyle`
  :root {
    color: mediumslateblue;
    --primary: mediumslateblue;
    --primary-darker: #6e5dd6;
    --primary-lighter: #bbb1f6;
    --light-accent: lavender;
    --lighter-accent: #f7f7fd;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SortSearchProvider>
        <Head>
          <title>Peoplegraph</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GlobalStyle />
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
      </SortSearchProvider>
    </AuthProvider>
  )
}

const Main = styled(Container).attrs(() => ({ as: 'main' }))`
  margin-bottom: 2rem;
`

export default App
