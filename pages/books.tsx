import React, {useEffect, useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {fetchBooks} from '../api/books'
import Layout from '../components/layout'
import Section from '../components/Section'
import Error from 'next/error'
import {AxiosError} from 'axios'
import Modal from 'react-modal'
import BookForm from '../components/book-form'
import {AuthRoute} from '../components/auth-route'
import BooksList from '../components/books-list'
import {useBook} from '../context/book-context'

function Books() {
  const {data, isError, isLoading, error} = useQuery('books', fetchBooks)
  const [selectedBook, setSelectedBook] = useBook()
  const [isAddingBook, setIsAddingBook] = useState(false)
  const [booksWanted, booksOwned, booksReading, booksRead] = useMemo(() => {
    if (!data?.length) {
      return [[], [], [], []]
    }

    function sortByTitle(a: Model.Book, b: Model.Book) {
      return a.title > b.title ? 1 : 0
    }

    data.sort(sortByTitle)

    return [
      data.filter(book => book.status === 'want'),
      data.filter(book => book.status === 'own'),
      data.filter(book => book.status === 'reading'),
      data.filter(book => book.status === 'read'),
    ]
  }, [data])

  useEffect(() => {
    if (selectedBook) {
      setIsAddingBook(true)
    }
  }, [selectedBook])

  if (isError) {
    return (
      <Error
        statusCode={(error as AxiosError).response.data.statusCode}
        title={(error as AxiosError).response.data.error}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="flex absolute justify-center items-center w-screen h-screen">
        Loading...
      </div>
    )
  }

  return (
    <Layout title="Books">
      <Section className="py-4">
        <BooksList title="Want" books={booksWanted} />
        <BooksList title="Own" books={booksOwned} />
        <BooksList title="Reading" books={booksReading} />
        <BooksList title="Read" books={booksRead} />

        <Modal
          appElement={document.body}
          isOpen={isAddingBook}
          className="p-6 mx-auto max-w-2xl bg-white rounded border-2 border-gray-500 shadow-lg"
          overlayClassName="bg-gray-100 bg-opacity-75 inset-0 absolute flex items-center justify-center"
          closeTimeoutMS={500}
          onRequestClose={() => setIsAddingBook(false)}
          onAfterClose={() => setSelectedBook(null)}
        >
          <section className="bg-white">
            <header className="text-lg font-bold">Add Book</header>
            {selectedBook && (
              <BookForm
                book={selectedBook}
                onSave={() => setIsAddingBook(false)}
              />
            )}
          </section>
        </Modal>
      </Section>
    </Layout>
  )
}

export default AuthRoute(Books)
