import * as React from 'react'
import {createContext, ProviderProps, useContext, useState} from 'react'
import {BookResult} from '../api/open-library'

type Context = [BookResult | null, (book: BookResult | null) => void]

const BookContext = createContext<Context>([null, () => null])

export function useBook() {
  return useContext(BookContext)
}

export function BookProvider({children}: ProviderProps<any>) {
  const [selectedBook, setSelectedBook] = useState<BookResult | null>(null)

  return (
    <BookContext.Provider value={[selectedBook, setSelectedBook]}>
      {children}
    </BookContext.Provider>
  )
}
