import {AuthProvider} from '../context/auth-context'
import '../styles/globals.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AppProps} from 'next/app'
import {ReactQueryDevtools} from 'react-query/devtools'

function App({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient()

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
