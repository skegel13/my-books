import Head from 'next/head'
import Layout from '../components/layout'
import Section from '../components/Section'
import useAuth from '../context/auth-context'
import Button from '../components/form/button'

export default function Home() {
  const {isAuthenticated} = useAuth()

  return (
    <>
      <Head>
        <title>My Books</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout title="Home">
        <Section className="mt-48">
          <h1 className="text-3xl font-medium tracking-tight text-center md:text-6xl">
            Welcome to MyBooks
          </h1>

          <p className="mt-2 text-lg text-center">
            A simple Next.js application using Strapi CMS to create a bookshelf
          </p>

          {isAuthenticated && (
            <div className="text-center mt-12">
              <Button isLink href="/books">
                Go to Bookshelf
              </Button>
            </div>
          )}
        </Section>
      </Layout>
    </>
  )
}
