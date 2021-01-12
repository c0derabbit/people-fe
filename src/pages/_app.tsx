import Head from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'
import { PageTransition } from 'next-page-transitions'

import { AuthProvider } from '../hooks/use-auth'
import { SearchProvider } from '../hooks/use-search'

import { Header } from '../components'
import { Container } from '../styled'

import 'modern-normalize/modern-normalize.css'

const GlobalStyle = createGlobalStyle`
  :root {
    color: mediumslateblue;
    --primary: mediumslateblue;
    --primary-darker: #6e5dd6;
    --primary-lighter: #bbb1f6;
    --light-accent: lavender;
    --lighter-accent: #f7f7fd;
    --light-grey: #f0f0fa;
    --danger: crimson;
    --danger-hover: firebrick;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <Head>
          <title>Peoplegraph</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GlobalStyle />
        <Header />
        <Main>
          <PageTransition timeout={500} classNames="page-transition">
            <Component {...pageProps} />
          </PageTransition>
        </Main>

        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
            transform: translateY(16px);
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 0.5s ease, transform 0.5s ease;
            transform: none;
          }
          .page-transition-exit {
            opacity: 1;
            transform: none;
          }
          .page-transition-exit-active {
            opacity: 0;
            transform: none;
            transition: opacity 300ms;
          }
        `}</style>
      </SearchProvider>
    </AuthProvider>
  )
}

const Main = styled(Container).attrs(() => ({ as: 'main' }))`
  margin-bottom: 2rem;
`

export default App
