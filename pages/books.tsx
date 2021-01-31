import React, {useState} from 'react'
import {useQuery} from 'react-query'
import {fetchBooks} from '../api/books'
import Layout from '../components/layout'
import Section from '../components/Section'
import Book from '../components/book'
import Error from 'next/error'
import {AxiosError} from 'axios'
import Modal from 'react-modal'
import BookForm from '../components/book-form'
import {AuthRoute} from '../components/auth-route'
import BookLookup from '../components/form/book-lookup'
import {BookResult} from '../api/open-library'

function Books() {
  const [isAddingBook, setIsAddingBook] = useState(false)
  const {data, isError, isLoading, error} = useQuery('books', fetchBooks)
  const [selectedBook, setSelectedBook] = useState<BookResult>(null)

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

  function onSetBook(bookResult: BookResult) {
    if (bookResult) {
      setSelectedBook(bookResult)
      setIsAddingBook(true)
    } else {
      setSelectedBook(null)
      setIsAddingBook(false)
    }
  }

  return (
    <Layout title="Books">
      <Section className="py-4">
        <div className="flex justify-end">
          <div className="w-96">
            <BookLookup value={selectedBook} setValue={onSetBook} />
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-end py-4">
          {data.map(book => (
            <li key={book.id}>
              <Book book={book} />
            </li>
          ))}
        </ul>
        <Modal
          appElement={document.body}
          isOpen={isAddingBook}
          className="p-6 mx-auto max-w-2xl bg-white rounded border-2 border-gray-500 shadow-lg"
          overlayClassName="bg-gray-100 bg-opacity-75 inset-0 absolute flex items-center justify-center"
          closeTimeoutMS={500}
          onRequestClose={() => setIsAddingBook(false)}
          onAfterClose={() => {
            setSelectedBook(null)
          }}
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
