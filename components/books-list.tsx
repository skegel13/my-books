import React from 'react'
import Book from './book'

interface Props {
  title: string
  books: Model.Book[]
}

function BooksList({title, books}: Props) {
  if (!books || !books.length) {
    return null
  }

  return (
    <>
      <h2 className="px-4 py-2 mt-4 mb-2 text-sm font-medium tracking-tight uppercase bg-gray-700 rounded-md shadow-md text-gray-50">
        {title}
      </h2>

      <ul className="grid items-end grid-cols-2 gap-8 py-4 mb-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
        {books.map(book => (
          <li key={book.id}>
            <Book book={book} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default BooksList
