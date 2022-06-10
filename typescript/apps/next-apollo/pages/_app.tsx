import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '~/plugins/apollo-client'
import Layout from '../components/03-templates/layout'
import '~/styles/global.scss'
import '~/styles/reset.scss'
import 'uno.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  )
}

export default App
