import React, {useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {fetchBooks} from '../api/books'
import Layout from '../components/layout'
import Section from '../components/Section'
import Error from 'next/error'
import {AxiosError} from 'axios'
import Modal from 'react-modal'
import BookForm from '../components/book-form'
import {AuthRoute} from '../components/auth-route'
import BookLookup from '../components/form/book-lookup'
import {BookResult} from '../api/open-library'
import produce from 'immer'
import BooksList from '../components/books-list'

interface State {
  isAddingBook: boolean
  selectedBook: BookResult | null
}

function Books() {
  const [state, setState] = useState<State>({
    isAddingBook: false,
    selectedBook: null,
  })
  const {data, isError, isLoading, error} = useQuery('books', fetchBooks)

  const [booksWanted, booksOwned, booksReading, booksRead] = useMemo(() => {
    if (!data.length) {
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
      setState(
        produce(state, draft => {
          draft.selectedBook = bookResult
          draft.isAddingBook = true
        }),
      )
    } else {
      setState(
        produce(state, draft => {
          draft.selectedBook = null
          draft.isAddingBook = false
        }),
      )
    }
  }

  return (
    <Layout title="Books">
      <Section className="py-4">
        <div className="flex justify-end">
          <div className="w-96">
            <BookLookup value={state.selectedBook} setValue={onSetBook} />
          </div>
        </div>

        <BooksList title="Want" books={booksWanted} />
        <BooksList title="Own" books={booksOwned} />
        <BooksList title="Reading" books={booksReading} />
        <BooksList title="Read" books={booksRead} />

        <Modal
          appElement={document.body}
          isOpen={state.isAddingBook}
          className="p-6 mx-auto max-w-2xl bg-white rounded border-2 border-gray-500 shadow-lg"
          overlayClassName="bg-gray-100 bg-opacity-75 inset-0 absolute flex items-center justify-center"
          closeTimeoutMS={500}
          onRequestClose={() =>
            setState(
              produce(state, draft => {
                draft.isAddingBook = false
              }),
            )
          }
          onAfterClose={() =>
            setState(
              produce(state, draft => {
                draft.selectedBook = null
              }),
            )
          }
        >
          <section className="bg-white">
            <header className="text-lg font-bold">Add Book</header>
            {state.selectedBook && (
              <BookForm
                book={state.selectedBook}
                onSave={() =>
                  setState(
                    produce(state, draft => {
                      draft.isAddingBook = false
                    }),
                  )
                }
              />
            )}
          </section>
        </Modal>
      </Section>
    </Layout>
  )
}

export default AuthRoute(Books)
