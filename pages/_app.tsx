import {AuthProvider} from '../context/auth-context'
import '../styles/globals.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AppProps} from 'next/app'
import {ReactQueryDevtools} from 'react-query/devtools'
import {BookProvider} from '../context/book-context'

function MyApp({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient()

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BookProvider value="">
          <Component {...pageProps} />
        </BookProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
