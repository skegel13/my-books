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

function Books() {
  const [isAddingBook, setIsAddingBook] = useState(false)
  const {data, isError, isLoading, error} = useQuery('books', fetchBooks)

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
        <div className="text-right">
          <button type="button" onClick={() => setIsAddingBook(true)}>
            + Add Book
          </button>
        </div>
        <ul className="grid grid-cols-4 gap-4 py-4">
          {data.map(book => (
            <li key={book.id}>
              <Book book={book} />
            </li>
          ))}
        </ul>
        <Modal
          appElement={document.body}
          isOpen={isAddingBook}
          className="overflow-hidden p-6 mx-auto max-w-2xl bg-gray-100 rounded border-2 border-gray-500 shadow-lg"
          overlayClassName="bg-gray-100 bg-opacity-75 inset-0 absolute flex items-center justify-center"
          closeTimeoutMS={500}
          onRequestClose={() => setIsAddingBook(false)}
        >
          <section>
            <header className="text-lg font-bold">Add Book</header>
            <BookForm onSave={() => setIsAddingBook(false)} />
          </section>
        </Modal>
      </Section>
    </Layout>
  )
}

export default Books
