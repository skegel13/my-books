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
      <h2 className="py-2 px-4 mt-4 mb-2 text-sm font-medium tracking-tight text-gray-50 uppercase bg-gray-700 rounded-md shadow-md">
        {title}
      </h2>

      <ul className="grid grid-cols-1 gap-8 items-end py-4 mb-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
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
